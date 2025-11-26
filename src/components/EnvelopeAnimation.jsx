import { useState } from "react";
import "./envelope.css";

export default function EnvelopeAnimation({ onOpened }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);

    setTimeout(() => {
      setShowMessage(true);
      if (onOpened) onOpened();
    }, 1700);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-6 relative">
      {!isOpen && (
        <p className="mb-4 text-[12px] text-pink-700 animate-pulse">
          Tap the envelope to open your birthday letter 💌
        </p>
      )}

      <div
        id="envelope"
        className={isOpen ? "open envelope-wrapper" : "close envelope-wrapper"}
        onClick={handleClick}
      >
        <div className="front flap" style={{ zIndex: isOpen ? 0 : 5 }}></div>
        <div className="front pocket"></div>

        <div className="letter real-letter">
          <div className="letter-content">
            <p className="title">Happy Birthday, Mansha 🎀</p>

            <p>Hey dummy, focus up.</p>

            <p>
              We planned this whole thing for you — do not get dramatic,
              control yourself.
            </p>

            <p>This is just the start. More surprises are waiting 🎈</p>
          </div>
        </div>
      </div>
        <div className="mask"></div>

      {isOpen && showMessage && (
        <p className="text-[11px] text-pink-600 mt-4 animate-fadeIn">
          Your letter is open now ✨
        </p>
      )}
    </div>
  );
}
