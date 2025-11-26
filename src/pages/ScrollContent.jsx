import { Link } from "react-router-dom";
import MessageCard from "../components/MessageCard.jsx";
import "./scrollContent.css";

import img1 from "../assets/memories/memory1.jpg";
import img2 from "../assets/memories/memory2.jpg";
import img3 from "../assets/memories/memory3.jpg";
import img4 from "../assets/memories/memory4.jpeg";
import img5 from "../assets/memories/memory5.jpeg";
import img6 from "../assets/memories/memory6.jpeg";
import img7 from "../assets/memories/memory7.jpeg";
import img8 from "../assets/memories/memory8.jpeg";
import img9 from "../assets/memories/memory9.jpeg";
import img10 from "../assets/memories/memory10.jpeg";
import { useEffect, useState } from "react";

export default function ScrollContent() {
  const [showCue, setShowCue] = useState(true);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 40) setShowCue(false);
      else setShowCue(true);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const blocks = [
    {
      image: img1,
      title: "Exhibit 1",
      text: "me when i post a picture jisme mai acha aa rkha hu without caring about you",
    },
    {
      image: img2,
      title: "Exhibit 2",
      text: "princesses",
    },
    {
      image: img3,
      title: "Exhibit 3",
      text: "my favorite picture of us",
    },
    {
      image: img4,
      title: "Exhibit 4",
      text: "the first time i bought you a bouquet and your smile was worth every bit mansha",
    },
    {
      image: img5,
      title: "Exhibit 5",
      text: "very pretty hmmmm saanjli provided me with a good picture",
    },
    {
      image: img6,
      title: "Exhibit 6",
      text: "such a cutie",
    },
    {
      image: img7,
      title: "Exhibit 7",
      text: "aren't you the most beautiful girl i have ever seen",
    },
    {
      image: img8,
      title: "Exhibit 8",
      text: "cutie bhieee cutiee",
    },
    {
      image: img9,
      title: "Exhibit 9",
      text: "Fav Family Photo",
    },
    {
      image: img10,
      title: "Exhibit 10",
      text: "Fav Family Photo 2.0",
    },
  ];
  return (
    <div className="app-container mx-auto min-h-screen flex flex-col relative">
      {/* HEADER */}
      <header className="p-4 text-center">
        <h1 className="text-xl font-bold text-pink-600 tracking-wide">
          A Timeline of Us
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          A curated set of moments, assembled with intent. Scroll to begin.
        </p>
      </header>

      {/* SCROLL CUE */}
      {showCue && (
        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="arrow" />
        </div>
      )}

      <main className="flex-1 px-4 space-y-6 pb-24 mt-2">
        {blocks.map((b, idx) => (
          <MessageCard
            key={idx}
            image={b.image}
            title={b.title}
            text={b.text}
          />
        ))}

        <div className="mt-6 text-center">
          <Link
            to="/treasure"
            className="inline-block bg-pink-500 text-white text-sm px-6 py-3 rounded-2xl shadow-md"
          >
            Start Treasure Hunt 🗺️
          </Link>
        </div>
      </main>
    </div>
  );
}
