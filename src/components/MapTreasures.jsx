// src/components/MapTreasures.jsx

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { TREASURE_LOCATIONS } from "../data/treasureLocations";
import MessageCard from "./MessageCard.jsx";
import CatLoader from "./CatLoader.jsx";

const defaultCenter = [78.02, 30.31]; // lng, lat

function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function renderCat() {
  const wrapper = document.createElement("div");
  wrapper.style.width = "55px";
  wrapper.style.height = "55px";
  wrapper.style.transform = "translate(-27px, -48px)";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  wrapper.innerHTML = `<div>${CatLoader()}</div>`;
  return wrapper;
}

export default function MapTreasures() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const secretMarkerRef = useRef(null);

  const [activeStop, setActiveStop] = useState(null);
  const [manualSelect, setManualSelect] = useState("");
  const [visited, setVisited] = useState([]);

  const baseStops = TREASURE_LOCATIONS.filter((loc) => !loc.isSecret);
  const secretStop = TREASURE_LOCATIONS.find((loc) => loc.isSecret);

  const allBaseVisited = baseStops.every((loc) =>
    visited.includes(loc.id)
  );
  const isAfter5 = new Date().getHours() >= 17;
  const secretAvailable = allBaseVisited && isAfter5;

  const visibleLocations = TREASURE_LOCATIONS.filter(
    (loc) => !loc.isSecret || (loc.isSecret && secretAvailable)
  );

  let nextStop =
    baseStops.find((loc) => !visited.includes(loc.id)) || null;
  if (!nextStop && secretAvailable && secretStop && !visited.includes(secretStop.id)) {
    nextStop = secretStop;
  }

  // Init map
  useEffect(() => {
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: defaultCenter,
      zoom: 13,
    });

    mapRef.current = map;

    // Base markers (non-secret)
    baseStops.forEach((loc) => {
      const el = document.createElement("div");
      el.style.width = "14px";
      el.style.height = "14px";
      el.style.background = "#f9c4d2";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

      new maplibregl.Marker(el)
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);
    });
  }, [baseStops]);

  // Secret marker visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !secretStop) return;

    if (secretAvailable && !secretMarkerRef.current) {
      const el = document.createElement("div");
      el.style.width = "16px";
      el.style.height = "16px";
      el.style.background = "#facc15";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.25)";

      secretMarkerRef.current = new maplibregl.Marker(el)
        .setLngLat([secretStop.lng, secretStop.lat])
        .addTo(map);
    }

    if (!secretAvailable && secretMarkerRef.current) {
      secretMarkerRef.current.remove();
      secretMarkerRef.current = null;
    }
  }, [secretAvailable, secretStop]);

  // Live GPS and range detection
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coord = [longitude, latitude];
        const map = mapRef.current;
        if (!map) return;

        map.flyTo({ center: coord, speed: 0.7 });

        if (!userMarkerRef.current) {
          userMarkerRef.current = new maplibregl.Marker({
            element: renderCat(),
          })
            .setLngLat(coord)
            .addTo(map);
        } else {
          userMarkerRef.current.setLngLat(coord);
        }

        // Only consider visible locations (secret locked until allowed)
        for (const stop of visibleLocations) {
          const d = getDistanceMeters(
            latitude,
            longitude,
            stop.lat,
            stop.lng
          );
          if (d <= stop.radius) {
            setActiveStop(stop);
            setVisited((prev) =>
              prev.includes(stop.id) ? prev : [...prev, stop.id]
            );
            break;
          }
        }
      },
      () => console.log("GPS unavailable"),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [visibleLocations]);

  const handleManual = (id) => {
    const stop = visibleLocations.find((l) => l.id === id);
    if (!stop) return;

    const map = mapRef.current;
    const coord = [stop.lng, stop.lat];

    setManualSelect(id);
    setActiveStop(stop);
    setVisited((prev) =>
      prev.includes(stop.id) ? prev : [...prev, stop.id]
    );

    if (map) {
      map.flyTo({ center: coord, speed: 0.7 });
    }

    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat(coord);
    } else if (map) {
      userMarkerRef.current = new maplibregl.Marker({
        element: renderCat(),
      })
        .setLngLat(coord)
        .addTo(map);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Next Stop Banner */}
      {nextStop && (
        <div className="w-full bg-pink-50 border border-pink-200 rounded-xl p-4 shadow-sm flex flex-col gap-1">
          <p className="text-[11px] font-semibold text-pink-700 tracking-wide uppercase">
            Your Next Stop
          </p>
          <p className="text-base font-bold text-gray-800">
            {nextStop.name}
          </p>
          <p className="text-[10px] text-gray-500">
            Move closer to uncover the next clue ✨
          </p>
        </div>
      )}

      {!nextStop && allBaseVisited && !secretAvailable && (
        <div className="w-full bg-pink-50 border border-pink-200 rounded-xl p-3 shadow-sm">
          <p className="text-[11px] text-gray-700 text-center">
            You’ve cleared all stops for now.  
            The secret spot will unlock after 5 PM ⏳
          </p>
        </div>
      )}

      {/* Map */}
      <div
        ref={mapContainer}
        className="w-full h-80 rounded-2xl overflow-hidden border border-pink-100 shadow-md"
      />

      {/* Manual selection */}
      <div className="flex flex-col gap-2 text-xs">
        <label className="font-semibold text-gray-700">
          Having GPS trouble? Choose manually:
        </label>
        <select
          value={manualSelect}
          onChange={(e) => handleManual(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-2 text-xs bg-white shadow-sm"
        >
          <option value="">Select a stop…</option>
          {visibleLocations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Popup for message card */}
      {activeStop && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
          <div className="bg-transparent">
            <MessageCard
              image={activeStop.image}
              title={activeStop.title}
              text={activeStop.text}
            />
            <button
              onClick={() => setActiveStop(null)}
              className="mt-3 block mx-auto text-xs px-3 py-1 rounded-full bg-pink-600 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
