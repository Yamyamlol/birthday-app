import { useEffect, useState } from "react";

export default function CookieModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyAccepted = localStorage.getItem("fake-cookie-accepted");

    if (!alreadyAccepted) {
      setTimeout(() => setVisible(true), 0); // <-- compliant
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    // No real cookies, just localStorage flag
    localStorage.setItem("fake-cookie-accepted", "yes");
    alert("Your cookie is on the way by delivery partner SANYAM 🍪🚴🏻‍♂️");
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-5 w-80 text-center shadow-lg">
        <h2 className="font-semibold mb-2">Accept Cookies?</h2>
        <p className="text-sm text-gray-600 mb-4">
          This app uses zero real cookies. Just emotional damage and inside
          jokes.
        </p>
        <button
          onClick={accept}
          className="w-full bg-pink-500 text-white py-2 rounded-xl text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
