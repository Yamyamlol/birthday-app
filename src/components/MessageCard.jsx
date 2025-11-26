export default function MessageCard({ image, title, text }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-xs mx-auto polaroid">
      <div className="polaroid-img-wrapper">
        <img src={image} alt={title} className="polaroid-img" />
      </div>

      <h2 className="text-sm font-semibold mt-3">{title}</h2>
      <p className="text-xs text-gray-600 mt-1">{text}</p>
    </div>
  );
}
