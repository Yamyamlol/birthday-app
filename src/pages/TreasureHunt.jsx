import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import MapTreasure from "../components/MapTreasures";

export default function TreasureHunt() {
  return (
    <div className="app-container mx-auto min-h-screen flex flex-col px-4 pt-4 pb-24">
      <header className="mb-4">
        <h1 className="text-lg font-semibold text-pink-600">
          Treasure Hunt Time 🎯
        </h1>
        <p className="text-xs text-gray-600">
          Go to the marked locations. When you are close enough, the surprise at
          that stop will unlock.
        </p>
      </header>

      <main className="flex-1">
        <MapTreasure />
      </main>

      <footer className="mt-6 text-center">
        <Link
          to="/final"
          className="inline-flex items-center gap-1 text-xs text-pink-600 underline"
        >
          <Lock className="w-3 h-3" />
          <span>Secret</span>
        </Link>
      </footer>
    </div>
  );
}
