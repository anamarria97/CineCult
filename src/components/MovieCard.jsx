import React from "react";

const MovieCard = ({ movie, isActive, onClick, onPlayTrailer, cast }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 rounded-xl shadow-md overflow-hidden w-64 sm:w-72 transition-all duration-300 relative transform cursor-pointer ${
        isActive ? "scale-105 shadow-2xl z-20 max-h-full" : "scale-100 max-h-[600px]"
      }`}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-72 object-cover rounded-t-lg"
      />

      <div className="p-2">
        <h2 className="text-lg font-semibold mb-1">{movie.title}</h2>
        <p
          className={`text-sm text-gray-400 mb-2 ${
            isActive ? "" : "line-clamp-3"
          }`}
        >
          {movie.description}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-yellow-400 font-bold">⭐ {movie.rating}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayTrailer();
            }}
            className="bg-yellow-500 text-black px-2 py-0.5 rounded-md hover:bg-yellow-400 text-sm font-medium"
          >
            ▶ Trailer
          </button>
        </div>
        {isActive && cast && cast.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Cast</h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              {cast.map((actor) => (
                <li key={actor.id}>
                  {actor.name} <span className="italic">as {actor.character}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
