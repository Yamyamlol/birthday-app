// src/pages/FinalMessage.jsx (or wherever it is)

import { useState } from "react";
import sanyam1 from "../assets/memories/sanyam1.png";
import sanyam2 from "../assets/memories/sanyam2.png";
import sanyam3 from "../assets/memories/sanyam3.png";
import "./FinalMessage.css";

export default function FinalMessage() {
  const [otp, setOtp] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const handleUnlock = () => {
    if (otp === "1772") {
      setUnlocked(true);
      setError("");
    } else {
      setError("Wrong OTP. Try again, agent.");
      setUnlocked(false);
    }
  };

  return (
    <div className="app-container mx-auto min-h-screen flex flex-col items-center justify-center px-6 py-8">
      {!unlocked ? (
        <div className="bg-white rounded-2xl p-6 shadow-md w-full space-y-3 max-w-sm">
          <h1 className="text-lg font-semibold text-center text-pink-600">
            Final Checkpoint 🔐
          </h1>
          <p className="text-xs text-gray-600 text-center">
            To unlock the final message, tell me the secret OTP.
          </p>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-2 w-full border rounded-xl px-3 py-2 text-center text-sm"
            placeholder="Enter OTP"
          />
          {error && (
            <p className="text-[11px] text-red-500 text-center">
              {error}
            </p>
          )}
          <button
            onClick={handleUnlock}
            className="w-full bg-pink-500 text-white py-2 rounded-xl text-sm mt-2"
          >
            Unlock
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm leading-relaxed w-full max-w-md">
          <h1 className="text-lg font-semibold text-pink-600 mb-3 text-center">
            You Did It 💌
          </h1>
          <p className="text-gray-700 mb-2">
            I know I joke around a lot, act dramatic, and say stupid things, but
            underneath all that nonsense, there is one very simple fact:
          </p>
          <p className="font-semibold text-pink-600 mb-2">
            I love you. Ridiculously. Consistently. On good days, bad days,
            sleepy days, and meltdown-over-small-things days.
          </p>
          <p className="text-gray-700 mb-2">
            You are the person I want to spam with memes, rant about life to,
            celebrate wins with, and annoy until we are both laughing for no
            reason.
          </p>
          <p className="text-gray-700">
            So this is me, in the nerdiest way possible, saying:{" "}
            <span className="font-semibold">thank you for being mine</span>.{" "}
            Happy Birthday, and I hope this stupid little app made you smile
            at least once.
          </p>

          {/* Secret gallery */}
   {/* Secret gallery */}
<div className="mt-6">
  <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide text-center">
    Sanyam&apos;s Secret Gallery
  </h2>

  <p className="text-[11px] text-gray-500 text-center mb-3">
    These are little pieces of me, for you — scroll slowly.
  </p>

  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
    {[sanyam1, sanyam2, sanyam3].map((img, idx) => (
      <div
        key={idx}
        className="bg-white shadow-lg rounded-xl p-4 w-full max-w-xs mx-auto polaroid"
      >
        <div className="polaroid-img-wrapper">
          <img
            src={img}
            alt={`Sanyam memory ${idx + 1}`}
            className="polaroid-img"
          />
        </div>

        <p className="text-[11px] text-gray-600 mt-2 text-center italic">
          — A tiny memory {idx + 1}
        </p>
      </div>
    ))}
  </div>
</div>

        </div>
      )}
    </div>
  );
}
