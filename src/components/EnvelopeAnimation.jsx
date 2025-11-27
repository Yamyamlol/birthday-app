import { useState } from "react";
import "./envelope.css";
import { useNavigate } from "react-router-dom";

export default function EnvelopeAnimation({ onOpened }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isOpen) return;

    setIsOpen(true);

    // Let the flap + letter animation play, THEN show the modal
    setTimeout(() => {
      setShowModal(true);
    }, 900); // tuned for your existing 0.6s + 0.4s timing
  };

  const handleStart = () => {
    setShowModal(false);
    if (onOpened) onOpened(); // navigate / continue flow
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/memories");
    setIsOpen(false);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Tap cue – subtle bounce, mobile-friendly */}
      {!isOpen && (
        <p className="mb-4 text-[12px] text-pink-700 tap-hint">
          Tap the envelope to read your letter 💌
        </p>
      )}
      <div className="container">


      <div
        id="envelope"
        className={isOpen ? "open envelope-wrapper" : "close envelope-wrapper"}
        onClick={handleClick}
      >
        {/* Front flap & pocket – unchanged animation behavior */}
        <div className="front flap" style={{ zIndex: isOpen ? 0 : 5 }}></div>
        <div className="front pocket"></div>

        {/* Letter inside envelope now only shows doodles – no big text */}
        <div className="letter real-letter">
          <div className="scribble-lines">
            <div className="scribble-line"></div>
            <div className="scribble-line short"></div>
            <div className="scribble-line"></div>
            <div className="scribble-line medium"></div>
            <div className="scribble-line"></div>
          </div>
        </div>
      </div>        
      </div>

      <div className="mask"></div>

      {/* Full-screen modal with actual letter text */}
      {showModal && (
        <div className="letter-modal-overlay">
          <div className="letter-modal-card">
            <button
              className="letter-modal-close"
              onClick={handleCloseModal}
              aria-label="Close letter"
            >
              ✕
            </button>

            <div className="letter-modal-inner">
              <p className="title modal-title">Happy Birthday, Mansha 🎀</p>
              <p className="modal-body-text">
                welcome to your personal adventure, We’ve hidden some surprises
                just for you. Follow the clues, enjoy the fun, and maybe even
                laugh a little along the way. Happy 22nd! You’re Officially Old…
                but don’t worry, we still love you Shasha Your treasure hunt
                starts now…first surprise awaits! Can you handle it, birthday
                girl?
              </p>
            </div>

            <button className="modal-primary-btn" onClick={handleStart}>
              Start your treasure hunt ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
