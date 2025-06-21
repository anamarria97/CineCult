import React from "react";

function MovieCard({ movie, isActive, onClick, onPlayTrailer, cast }) {
  return (
    <div
      className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2`}
    >
      <div
        className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer h-full flex flex-col`}
        onClick={onClick}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-auto object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-2 text-yellow-400">{movie.title}</h3>
          <p className="text-sm text-gray-300 mb-2 line-clamp-3">{movie.description}</p>
          <p className="text-sm text-yellow-500 font-semibold">⭐ {movie.rating.toFixed(1)}</p>

          {isActive && cast.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-white mb-1">Top Cast:</h4>
              <ul className="text-sm text-gray-300 list-disc ml-4 space-y-1">
                {cast.map((actor) => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
              </ul>
            </div>
          )}

          {isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevenim trigger-ul onClick de pe card
                onPlayTrailer();
              }}
              className="mt-4 px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400 transition-colors"
            >
              ▶️ Play Trailer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
