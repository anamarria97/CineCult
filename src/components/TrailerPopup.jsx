const TrailerPopup = ({ trailerKey, onClose }) => {
  if (!trailerKey) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="relative bg-gray-900 rounded-lg shadow-lg w-full max-w-xl aspect-video p-2">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 text-white text-xl bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
          aria-label="Close trailer"
        >
          &times;
        </button>

        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="rounded-md w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerPopup;
