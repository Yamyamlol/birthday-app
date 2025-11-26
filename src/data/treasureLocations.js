// src/data/treasureLocations.js

import location1 from "../assets/locations/location1.png";
import location2 from "../assets/locations/location2.png";
import location3 from "../assets/locations/location3.png";
import location4 from "../assets/locations/location4.png";
import location5 from "../assets/locations/location5.png";
import location6 from "../assets/locations/location6.png";
import location7 from "../assets/locations/location7.png";
import location8 from "../assets/locations/location8.png";
import location9 from "../assets/locations/location9.png";
import sanyam1 from "../assets/memories/sanyam1.png";

// radius = 50 meters for all

export const TREASURE_LOCATIONS = [
  {
    id: "flower-shop",
    name: "Our Flower shop",
    lat: 30.324205957869676,
    lng: 78.00583230756817,
    radius: 50,
    image: location1,
    title: "Our favorite flower shop",
    text: "Our go to flower shop, I will always buy you lilies from here!",
  },
  {
    id: "bus-stop",
    name: "Bus stop",
    lat: 30.271016447016958,
    lng: 77.99603464371131,
    radius: 50,
    image: location2,
    title: "Saanjli and Mansha's secret meetups",
    text: "From bus stop parkour to this day, there’s only chaos—but I’m thankful we never looked back.",
  },
  {
    id: "convention-center",
    name: "Convention Center",
    lat: 30.268869300977475,
    lng: 77.99477213129312,
    radius: 50,
    image: location3,
    title: "Saanjli and Mansha's first meet",
    text: "Grateful for the “tum nayi ho, ajao aajao humare saath baithjao”.",
  },
  {
    id: "last-year-birthday",
    name: "Last year birthday spot",
    lat: 30.256651792731464,
    lng: 78.00442732763648,
    radius: 50,
    image: location4,
    title: "Your last year's birthday",
    text: "Last year we celebrated your birthday on this exact spot and I had so much fun with you. Saanjli said “our firsts”.",
    // NOTE: Only you can confirm if this is the exact correct pin.
    // If this matches the place where you actually celebrated last year on Google Maps, then you're good.
  },
  {
    id: "mohobbewala",
    name: "Mohobbewala",
    lat: 30.266319512240624,
    lng: 77.98447448567921,
    radius: 50,
    image: location5,
    title: "Our go to spot",
    text: "So many memories here, so many times we've been late because we were here. And also guess what? (IF YOU DON'T GET THIS ONE WE'RE GOING BACK HOME)",
  },
  {
    id: "mama-momos",
    name: "Mama Momos",
    lat: 30.318405295170873,
    lng: 78.00172690850651,
    radius: 50,
    image: location6,
    title: "Mama Momos",
    text: "Saanjli said you have countless memories with this place.",
  },
  {
    id: "bouffet-burgers",
    name: "Bouffet Burgers",
    lat: 30.32692714004665,
    lng: 78.04507305080311,
    radius: 50,
    image: location7,
    title: "BURGERS",
    text: "I really love the burgers here. Thanks for introducing me to this place—I'm going to eat 2 burgers today for sure.",
  },
  {
    id: "nivh",
    name: "NIVH",
    lat: 30.353343846869258,
    lng: 78.06332394401659,
    radius: 50,
    image: location8,
    title: "NIVH",
    text: "Saanjli's NIVH.",
  },
  {
    id: "dbakester-cafe",
    name: "Dbakester Cafe!n",
    lat: 30.3705084670961,
    lng: 78.06110723272776,
    radius: 50,
    image: location9,
    title: "CAFE!N",
    text: "These photos sum up our friendship perfectly, and I wouldn’t change a single moment. There’s no one else I’d rather share it with.",
  },
  {
    id: "sanyam-secret",
    name: "Sanyam's secret spot",
    lat: 30.338863304514856, // TODO: replace with actual secret coordinates
    lng: 77.91796193925741,
    radius: 50,
    image: sanyam1,
    title: "Sanyam's secret spot",
    text: "You made it till the end. This one’s just between you and me.",
    isSecret: true,
  },
];
