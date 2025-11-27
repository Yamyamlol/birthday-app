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
    text: "I still can’t believe we chose bus-stop parkour over simply confronting them. Like??? Not us thinking we were in some crazy movie instead of real life. But look at us now, upgraded to ‘two semi-functional adults’. Honestly? Growth🙇‍♀️",
  },
  {
    id: "convention-center",
    name: "Convention Center",
    lat: 30.268869300977475,
    lng: 77.99477213129312,
    radius: 50,
    image: location3,
    title: "Saanjli and Mansha's first meet",
    text: "grateful for the “tum nayi ho, aajao aajao humare saath baithjao” and most importantly the tapu",
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
    text: "OH MY GOD, the amount of memories in this place??? Like where do I even START, this spot has seen more of our phases in the last year than i can process, time literally speed ran when we were here, Honestly WE should charging this place rent for the emotional damage And yk what this place reminds me of? darwani aunty ki shop ki chai😭",
  },
  {
    id: "mama-momos",
    name: "Mama Momos",
    lat: 30.318405295170873,
    lng: 78.00172690850651,
    radius: 50,
    image: location6,
    title: "Mama Momos",
    text: "We’d go to all your fav spots again if it meant putting a smile on your face. And this place?? Our literal first outing ever, (yes aur bhi log the) I still remember hum bus mein kaise baithke gaye the 😭",
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
    text: "NIVH was honestly the craziest experience ever, like lowkey insane, but in the best way. It literally made us fall in love with the whole clinical field!? Who would’ve thought. I loved roaming around the entire campus with you - the canteen, the park/walking area, THE library, the random dept buildings, and obviously the pool-wala area. nivh was like our second home damn we acted like we owned the place.",
  },
  {
    id: "dbakester-cafe",
    name: "Dbakester Cafe!n",
    lat: 30.3705084670961,
    lng: 78.06110723272776,
    radius: 50,
    image: location9,
    title: "CAFE!N",
    text: "Baking with you is actually sweeeet (pun 100% intended). Bhai, only we know the struggle behind this entire day, battle scars and all Our whole friendship could literally be described by the two photos from this day. Isss photo ke baad toh we were out there ready to end people’s careers and livesss fr. My OG passenger princess, NO GPS We’ve stood by each other so many times, and every single time I’ve been grateful because idk who else I’d survive all this chaos with. These photos sum up our friendship perfectly, and I wouldn’t change a single moment. Thank you shasha for being the wonderful human being that you are, Happy Happy Birthday",
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
