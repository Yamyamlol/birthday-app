import { useEffect, useState } from "react";
import frame1 from "../assets/cat/frame1.png";
import frame2 from "../assets/cat/frame2.png";
import frame3 from "../assets/cat/frame3.png";
import frame4 from "../assets/cat/frame4.png";
import frame5 from "../assets/cat/frame5.png";
import frame6 from "../assets/cat/frame6.png";
import frame7 from "../assets/cat/frame7.png";
import frame8 from "../assets/cat/frame8.png";
import frame9 from "../assets/cat/frame9.png";
import frame10 from "../assets/cat/frame10.png";
import frame11 from "../assets/cat/frame11.png";
import frame12 from "../assets/cat/frame12.png";
import frame13 from "../assets/cat/frame13.png";
import frame14 from "../assets/cat/frame14.png";
import frame15 from "../assets/cat/frame15.png";
import frame16 from "../assets/cat/frame16.png";

const frames = [
  frame1,
  frame2,
  frame3,
  frame4,
  frame5,
  frame6,
  frame7,
  frame8,
  frame9,
  frame10,
  frame11,
  frame12,
  frame13,
  frame14,
  frame15,
  frame16,
];

export default function CatLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, 80); // adjust speed
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-pink-100 z-50">
      <img
        src={frames[index]}
        alt="Loading cat"
        className="w-28 h-28"
      />
    </div>
  );
}
