// src/components/MapTreasures.jsx

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { TREASURE_LOCATIONS } from "../data/treasureLocations";
import MessageCard from "./MessageCard.jsx";

const defaultCenter = [78.02, 30.31]; // lng, lat

function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Pure DOM element builder
function renderCat() {
  const wrapper = document.createElement("div");
  wrapper.style.width = "55px";
  wrapper.style.height = "55px";
  wrapper.style.transform = "translate(-27px, -48px)";
  wrapper.innerHTML = `
    <svg
      width="55"
      height="55"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" fill="#f9c4d2">
        <animate
          attributeName="r"
          values="36;40;36"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="35" cy="40" r="6" fill="#222" />
      <circle cx="65" cy="40" r="6" fill="#222" />

      <path
        d="M40 55 Q50 65 60 55"
        stroke="#222"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
      />
    </svg>
  `;
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

  const allBaseVisited = baseStops.every((loc) => visited.includes(loc.id));

  const isAfter5 = new Date().getHours() >= 17;
  const secretAvailable = allBaseVisited && isAfter5;

  const visibleLocations = TREASURE_LOCATIONS.filter(
    (loc) => !loc.isSecret || (loc.isSecret && secretAvailable)
  );

  // Next stop logic
  let nextStop = baseStops.find((loc) => !visited.includes(loc.id)) || null;

  if (
    !nextStop &&
    secretAvailable &&
    secretStop &&
    !visited.includes(secretStop.id)
  ) {
    nextStop = secretStop;
  }

  // Initialize Map
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

    // Initialize cat marker immediately
    userMarkerRef.current = new maplibregl.Marker({
      element: renderCat(),
    })
      .setLngLat(defaultCenter)
      .addTo(map);

    // Base treasure markers
    baseStops.forEach((loc) => {
      const el = document.createElement("div");
      el.style.width = "14px";
      el.style.height = "14px";
      el.style.background = "#f9c4d2";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";

      new maplibregl.Marker(el).setLngLat([loc.lng, loc.lat]).addTo(map);
    });
  }, [baseStops]);

  // Secret marker management
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

      secretMarkerRef.current = new maplibregl.Marker(el)
        .setLngLat([secretStop.lng, secretStop.lat])
        .addTo(map);
    }

    if (!secretAvailable && secretMarkerRef.current) {
      secretMarkerRef.current.remove();
      secretMarkerRef.current = null;
    }
  }, [secretAvailable, secretStop]);

  // GPS Watch
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;

        console.log("GPS:", latitude, longitude, "Accuracy:", accuracy);

        if (!latitude || !longitude) return;
        if (longitude === 0 && latitude === 0) return;

        const coord = [longitude, latitude];
        const map = mapRef.current;

        map.flyTo({ center: coord, speed: 0.6 });

        userMarkerRef.current.setLngLat(coord);

        // Distance detection
        for (const stop of visibleLocations) {
          const d = getDistanceMeters(latitude, longitude, stop.lat, stop.lng);
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
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [visibleLocations]);

  // Manual override
  const handleManual = (id) => {
    const stop = visibleLocations.find((l) => l.id === id);
    if (!stop) return;

    const coord = [stop.lng, stop.lat];
    const map = mapRef.current;

    setManualSelect(id);
    setActiveStop(stop);
    setVisited((prev) => (prev.includes(stop.id) ? prev : [...prev, stop.id]));

    map.flyTo({ center: coord, speed: 0.6 });
    userMarkerRef.current.setLngLat(coord);
  };

  return (
    <div className="flex flex-col gap-4">
      {nextStop && (
        <div className="w-full bg-pink-50 border border-pink-200 rounded-xl p-4 shadow-sm">
          <p className="text-[11px] font-semibold text-pink-700 uppercase">
            Your Next Stop
          </p>
          <p className="text-base font-bold text-gray-800">{nextStop.name}</p>
          <p className="text-[10px] text-gray-500">
            Move closer to uncover the next clue ✨
          </p>
        </div>
      )}

      {!nextStop && allBaseVisited && !secretAvailable && (
        <div className="w-full bg-pink-50 border border-pink-200 rounded-xl p-3 shadow-sm">
          <p className="text-[11px] text-gray-700 text-center">
            You’ve cleared all stops for now. The secret spot unlocks after 5 PM
            ⏳
          </p>
        </div>
      )}

      <div
        ref={mapContainer}
        className="w-full h-80 rounded-2xl overflow-hidden border border-pink-100 shadow-md"
      />

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

      {activeStop && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
          <div>
            <MessageCard
              image={activeStop.image}
              title={activeStop.title}
              text={activeStop.text}
            />
            <button
              onClick={() => setActiveStop(null)}
              className="mt-3 mx-auto block text-xs px-3 py-1 rounded-full bg-pink-600 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
