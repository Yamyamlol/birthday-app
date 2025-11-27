import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnvelopeAnimation from "../components/EnvelopeAnimation.jsx";
import CatLoader from "../components/CatLoader.jsx";
import "../styles/floatingCute.css";

export default function Landing() {
  const [showLoader, setShowLoader] = useState(true);
  const [canContinue, setCanContinue] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const id = setTimeout(() => setShowLoader(false), 5000);
    return () => clearTimeout(id);
  }, []);

  const handleOpened = () => setCanContinue(true);

  const handleNavigate = () => {
    if (canContinue) navigate("/memories");
  };

  useEffect(() => {
    const icons = ["svg1", "svg2", "png1", "png2"];

    const randomItems = Array.from({ length: 30 }, () => ({
      id: crypto.randomUUID(),
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 10,
      size: 40 + Math.random() * 70,
    }));

    setItems(randomItems);
  }, []);

  return (
    <div
      className="app-container mx-auto relative overflow-hidden min-h-screen bg-[#ffe6f2]"
      onClick={handleNavigate}
    >
      {showLoader && <CatLoader />}
      {!showLoader && (
        <>
          <EnvelopeAnimation onOpened={handleOpened} />
          {canContinue && (
            <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[12px] text-pink-600 font-medium animate-pulse z-50">
              Tap anywhere to continue 🎀
            </p>
          )}
        </>
      )}

      <div className="floating-cute-items pointer-events-none">
        {items.map((item) => (
          <div
            key={item.id}
            className="cute-item"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              width: `${item.size}px`,
              height: `${item.size}px`,
            }}
          >
            {item.icon === "svg1" && (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <ellipse
              cx="15.5"
              cy="38.029"
              fill-rule="evenodd"
              clip-rule="evenodd"
              rx="1.5"
              ry="2.5"
            ></ellipse>
            <ellipse
              cx="31.5"
              cy="35.029"
              fill-rule="evenodd"
              clip-rule="evenodd"
              rx="1.5"
              ry="2.5"
            ></ellipse>
            <path
              fill="#ffeb00"
              fill-rule="evenodd"
              d="M24.153,38.333c1.025-0.18,1.955,0.229,2.075,0.913	c0.12,0.683-0.615,1.384-1.641,1.564s-1.955-0.229-2.075-0.913C22.392,39.213,23.128,38.512,24.153,38.333z"
              clip-rule="evenodd"
            ></path>
            <path
              fill="#ff7daa"
              fill-rule="evenodd"
              d="M42.367,6.529c-2.325-0.594-18.646,4-18.646,4s-3.721-6-6.285-7	c-2.563-1-5.832,0-6.849,1c-1.017,1-3.256,5-4.101,8.431c-0.415,1.686-0.422,4.749-0.321,7.43c0.471-0.528,1.155-0.861,1.918-0.861	c1.418,0,2.57,1.152,2.57,2.57c0,0.642-0.236,1.229-0.625,1.679c1.131,0.27,1.972,1.287,1.972,2.5c0,1.418-1.152,2.57-2.57,2.57	c-0.697,0-1.329-0.278-1.792-0.728c-0.309,1.149-1.359,1.996-2.605,1.996c-0.209,0-0.411-0.029-0.606-0.074	c-0.455,1.834-0.488,3.722,0.007,5.57c1.952,7.283,11.138,11.16,20.501,8.651c9.363-2.509,15.381-10.459,13.429-17.742	c-1.068-3.986-4.303-6.95-8.547-8.407l0.624-0.584c0,0,10.327-0.474,11.56-0.73c1.233-0.256,4.5-3.839,5-5.509	C47.5,9.62,44.692,7.122,42.367,6.529z M36.263,33.133c1.094,4.081-3.989,8.995-11.342,10.965	c-7.354,1.97-14.212,0.256-15.305-3.825c-1.094-4.081,3.989-8.995,11.342-10.965C28.312,27.338,35.17,29.052,36.263,33.133z"
              clip-rule="evenodd"
            ></path>
            <path
              fill="#ff3880"
              d="M40.277,5.071c-0.052,0-0.104,0-0.155,0c-4.963,0-12.078,2.076-14.539,3.206l-0.391,0.178	c-0.339,0.154-0.803,0.366-1.156,0.529c-0.367-0.761-0.79-1.459-1.236-2.054c-1.463-1.951-3.675-4.9-9.289-4.9	c-1.585,0-4.002,0.861-5.599,3.287C5.551,8.9,5.316,15.039,5.536,19.558c0.001,0.022,0.013,0.04,0.015,0.062	c-0.138,0.14-0.28,0.276-0.393,0.437c-0.463-0.203-0.967-0.31-1.486-0.31c-2.039,0-3.698,1.659-3.698,3.698	c0,1.187,0.575,2.285,1.499,2.972c-0.091,0.324-0.138,0.66-0.138,1.001c0,1.401,0.793,2.608,1.945,3.235	c-0.316,1.766-0.268,3.517,0.188,5.217c1.668,6.223,8.193,10.152,15.778,10.152c1.935,0,3.938-0.256,5.947-0.794	c4.742-1.271,8.825-3.914,11.496-7.443c2.729-3.604,3.665-7.697,2.64-11.524c-0.873-3.26-3.132-5.962-6.261-7.76	c0.629,0.014,1.261,0.025,1.894,0.025c2.294,0,4.547-0.114,6.255-0.494c5.467-1.215,6.283-4.882,6.283-6.96	C47.5,8.685,45.576,5.117,40.277,5.071z M1.974,23.445c0-0.936,0.762-1.698,1.698-1.698c0.451,0,0.877,0.176,1.198,0.496	c0.258,0.257,0.638,0.354,0.984,0.251c0.35-0.102,0.616-0.385,0.696-0.741c0.159-0.709,0.804-1.225,1.532-1.225	c0.865,0,1.569,0.705,1.569,1.57c0,0.376-0.136,0.741-0.382,1.025c-0.229,0.264-0.302,0.628-0.195,0.961	c0.107,0.332,0.381,0.584,0.721,0.666C10.505,24.919,11,25.548,11,26.278c0,0.866-0.704,1.57-1.57,1.57	c-0.411,0-0.799-0.158-1.094-0.444c-0.253-0.248-0.617-0.342-0.962-0.248c-0.342,0.094-0.608,0.362-0.701,0.704	c-0.187,0.693-0.796,1.174-1.503,1.233c-0.445-0.001-0.75-0.076-1.015-0.229c-0.489-0.298-0.82-0.832-0.82-1.446	c0-0.32,0.09-0.633,0.261-0.903c0.161-0.256,0.198-0.571,0.101-0.857s-0.32-0.512-0.604-0.616	C2.423,24.797,1.974,24.156,1.974,23.445z M21.217,30.274c1.952-0.523,3.897-0.787,5.718-0.787c1.345,0,2.621,0.145,3.781,0.434	c2.524,0.631,4.151,1.863,4.582,3.471s-0.362,3.488-2.232,5.297c-2.023,1.956-5.008,3.534-8.403,4.444	c-3.394,0.909-6.769,1.035-9.499,0.353c-2.524-0.631-4.151-1.863-4.582-3.471s0.362-3.488,2.232-5.297	C14.837,32.762,17.821,31.184,21.217,30.274z M37.397,26.778c0.515,1.923,0.418,3.939-0.234,5.912	c-0.69-2.245-2.791-3.916-5.963-4.709c-3.052-0.761-6.783-0.634-10.501,0.362c-3.718,0.996-7.012,2.75-9.275,4.938	c-2.375,2.296-3.359,4.822-2.796,7.131c-1.554-1.366-2.695-3.069-3.228-5.06c-0.371-1.384-0.418-2.813-0.172-4.261	c1.138-0.061,2.171-0.627,2.813-1.524c0.435,0.184,0.904,0.28,1.389,0.28c1.969,0,3.57-1.602,3.57-3.57	c0-1.216-0.605-2.309-1.563-2.957c0.142-0.389,0.216-0.802,0.216-1.223c0-1.969-1.602-3.57-3.569-3.57	c-0.196,0-0.384,0.04-0.573,0.072C7.33,13.056,8.051,8.74,9.582,6.415c1.086-1.648,2.756-2.386,3.929-2.386	c4.614,0,6.319,2.273,7.689,4.1c1.461,1.948,2.592,5.247,1.81,7.524c-0.421,1.228-1.328,2.017-2.772,2.411	c-1.691,0.459-3.114,0.336-4.233-0.369c-1.981-1.25-2.499-3.953-2.509-4.004c-0.096-0.542-0.613-0.907-1.156-0.81	c-0.544,0.095-0.908,0.613-0.813,1.157c0.025,0.146,0.658,3.601,3.396,5.339c1.616,1.026,3.583,1.235,5.841,0.617	c1.327-0.362,2.387-1.018,3.148-1.926c0.283,0.022,0.779,0.063,1.05,0.085l0.177,0.014C31.316,18.66,36.129,22.04,37.397,26.778z M40.783,16.079c-2.935,0.652-8.076,0.433-11.479,0.289c-1.328-0.057-2.382-0.101-3.079-0.091c0,0-0.001,0-0.001,0	c-0.307-0.038-0.614-0.078-0.928-0.103l-0.174-0.014c-0.051-0.004-0.112-0.009-0.176-0.015c0.522-1.663,0.358-3.549-0.18-5.297	c0.344-0.159,0.879-0.402,1.254-0.573l0.396-0.181c2.282-1.048,9.273-3.093,13.843-3.023c4.146,0.036,5.24,2.632,5.24,4	C45.5,13.698,43.913,15.383,40.783,16.079z"
            ></path>
            <path
              fill="#ffeb00"
              fill-rule="evenodd"
              d="M5.989,23.587c0.808-0.217,1.621,0.192,1.814,0.911	c0.193,0.719-0.307,1.48-1.115,1.696s-1.621-0.192-1.814-0.911C4.68,24.563,5.18,23.803,5.989,23.587z"
              clip-rule="evenodd"
            ></path>
          </svg>
            )}

            {item.icon === "svg2" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="#212121"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M39.391,17.033	C40.447,8.823,38.466,6.46,37.5,6.25c-3.138-0.684-7.647,2.509-9.451,3.864c-1.464-0.313-2.984-0.497-4.549-0.497	c-2.893,0-5.593,0.584-7.993,1.592c-1.494-0.763-4.96-2.316-7.632-1.841c-0.591,0.105-3.606,3.234-0.85,9.33	c-1.051,1.98-1.65,4.171-1.65,6.479c0,8.525,7.125,13.068,18.625,13.07c11,0.002,18.25-4.546,18.25-13.07	C42.25,22.199,41.186,19.411,39.391,17.033z"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M8.625,27.381	c0,0-2.75-0.131-6.875,0.869"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M3.875,32.5	c0,0,1.75-1.125,5.125-1.75"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M5.75,37.256	c0,0,1.375-1.5,5.625-3.625"
            ></path>
            <circle cx="32.375" cy="14.506" r="3.5" fill="#e40f63"></circle>
            <path
              fill="#e40f63"
              d="M32.125,11.381c0,0-1-4.875-4.875-5.375c0,0-2.375-0.375-4.25,4.625c0,0-1.5,4.625,1.5,6	c0,0,2,0.75,5.75-1.125L32.125,11.381z"
            ></path>
            <path
              fill="#e40f63"
              d="M34.5,12.631c0,0,4.125-2,6-0.375s1.375,4.125,0,6.125c-0.923,1.343-2.25,2.375-3.75,2.25	s-3-1.125-3.875-3.5L34.5,12.631z"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M39.375,24.256	c0,0,3.875-1.25,7.25-0.75"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M40.5,27.631	c0,0,2.875,0,5.125,0.375"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M39,31.131	c0,0,2.875,0.375,5.875,2"
            ></path>
            <ellipse
              cx="14.5"
              cy="28.011"
              fill="#212121"
              rx="1.5"
              ry="1.989"
            ></ellipse>
            <ellipse
              cx="33.5"
              cy="26.989"
              fill="#212121"
              rx="1.5"
              ry="1.989"
            ></ellipse>
            <ellipse
              cx="24.595"
              cy="30.5"
              fill="#ffd302"
              stroke="#212121"
              stroke-miterlimit="10"
              stroke-width="1.4"
              rx="2.349"
              ry="1.749"
              transform="rotate(-2.987 24.617 30.527)"
            ></ellipse>
            <path
              fill="none"
              stroke="#212121"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M28.875,14.256c-0.966,0-1.75-0.784-1.75-1.75	s0.784-1.75,1.75-1.75c0.637,0,1.194,0.34,1.5,0.848"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M35.937,14.125c0.932,0,1.688,0.728,1.688,1.626	c0,0.898-0.5,1.626-1.688,1.626c-0.245,0-0.727-0.162-0.937-0.252"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M35.875,14.506c0,1.933-1.567,3.5-3.5,3.5	s-3.5-1.567-3.5-3.5s1.567-3.5,3.5-3.5c1.807,0,3.294,1.369,3.48,3.127C35.868,14.256,35.875,14.38,35.875,14.506z"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-miterlimit="10"
              stroke-width="1.391"
              d="M31.956,10.758	c-0.413-1.331-1.671-4.363-4.643-4.752c0,0-2.343-0.375-4.193,4.625c0,0-1.48,4.625,1.48,6c0,0,1.58,0.601,4.563-0.617"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M35.25,12.315	c1.278-0.489,3.872-1.253,5.25-0.059c1.875,1.625,1.375,4.125,0,6.125c-0.923,1.343-2.25,2.375-3.75,2.25	c-1.303-0.109-2.607-0.878-3.5-2.636"
            ></path>
            <path
              fill="none"
              stroke="#212121"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="1.4"
              d="M8,17.426	c0,0-0.875,0.875-1.625,2.625"
            ></path>
          </svg>
            )}

            {item.icon === "png1" && (
  <img
            src="data:image/png;base64,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"
            alt="kawaii-ice-cream"
          />
            )}

            {item.icon === "png2" && (
          <img
            src="data:image/png;base64,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"
            alt="cute-frog"
          />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
