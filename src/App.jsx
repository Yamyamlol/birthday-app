import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import TreasureHunt from "./pages/TreasureHunt.jsx";
import FinalMessage from "./pages/FinalMessage.jsx";
import CookieModal from "./components/CookieModal.jsx";
import ScrollContent from "./Pages/ScrollContent.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-pink-50 text-slate-800">
        <CookieModal />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/memories" element={<ScrollContent />} />
        <Route path="/treasure" element={<TreasureHunt />} />
        <Route path="/final" element={<FinalMessage />} />
      </Routes>
    </div>
  );
}
