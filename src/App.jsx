import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import TrailerPopup from "./components/TrailerPopup";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  10749: "Romance",
  53: "Thriller",
  37: "Western",
};

const yearFilters = [
  { label: "All Years", value: "all" },
  { label: "After 2020", value: "2020" },
  { label: "2010 – 2019", value: "2010" },
  { label: "2000 – 2009", value: "2000" },
  { label: "Before 2000", value: "before2000" },
];


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [activeMovieId, setActiveMovieId] = useState(null);
  const [cast, setCast] = useState([]);
  const [selectedTrailerKey, setSelectedTrailerKey] = useState(null);
  const [showGenres, setShowGenres] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  useEffect(() => {
    if (!activeMovieId) {
      setCast([]);
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/movie/${activeMovieId}/credits?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCast(data.cast.slice(0, 5)))
      .catch((err) => console.error("Error fetching cast:", err));
  }, [activeMovieId]);

  const handlePlayTrailer = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) setSelectedTrailerKey(trailer.key);
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((movie) => {
      const year = parseInt(movie.release_date?.split("-")[0]);
      if (!year) return false;
      switch (yearFilter) {
        case "2020":
          return year >= 2020;
        case "2010":
          return year >= 2010 && year < 2020;
        case "2000":
          return year >= 2000 && year < 2010;
        case "before2000":
          return year < 2000;
        default:
          return true;
      }
    });

  const moviesByGenre = filteredMovies.reduce((acc, movie) => {
    movie.genre_ids?.forEach((genreId) => {
      if (!acc[genreId]) acc[genreId] = [];
      acc[genreId].push(movie);
    });
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 text-yellow-500 p-4 md:p-8">
      <div className="sticky top-0 z-50 bg-gray-900 py-4 mb-6 px-6 border-b border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-4xl font-extrabold text-center md:text-left cursor-pointer hover:text-yellow-400 transition-colors"
          >
            CineCult
          </h1>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-end">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
            />
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-700 text-white"
            >
              {yearFilters.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

<div className="mt-4 sm:hidden">
  <button
    onClick={() => setShowGenres(!showGenres)}
    className="flex items-center text-white text-lg font-semibold gap-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
  >
    {showGenres ? "Hide Genres" : "Show Genres"}
    <span className={`transform transition-transform ${showGenres ? "rotate-180" : "rotate-0"}`}>
      ▼
    </span>
  </button>

  {showGenres && (
    <div className="mt-4 flex flex-col gap-2">
      {Object.entries(genreMap).map(([id, name]) => (
        <a
          key={id}
          href={`#${name.replace(/\s+/g, "")}`}
          className="text-white hover:text-yellow-400 transition-colors"
        >
          {name}
        </a>
      ))}
    </div>
  )}
</div>


<div className="mt-4 hidden sm:flex sm:space-x-6 py-6">
  {Object.entries(genreMap).map(([id, name]) => (
    <a
      key={id}
      href={`#${name.replace(/\s+/g, "")}`}
      className="text-lg text-white hover:text-yellow-400 transition-colors"
    >
      {name}
    </a>
  ))}
</div>

      </div>

    
      <div className="space-y-12">
        {Object.entries(moviesByGenre).map(([genreId, moviesInGenre]) => {
          const genreName = genreMap[genreId] || "🎞 Other";
          return (
            <div key={genreId}>
              <h2
                id={genreName.replace(/\s+/g, "")}
                className="text-2xl font-bold my-12 scroll-mt-24 ml-8"
              >
                {genreName}
              </h2>

              <div className="flex flex-wrap gap-6 justify-start px-4 md:px-10">

                {moviesInGenre.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={{
                      id: movie.id,
                      title: movie.title,
                      description: movie.overview,
                      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                      rating: movie.vote_average,
                    }}
                    isActive={activeMovieId === movie.id}
                    onClick={() =>
                      setActiveMovieId(activeMovieId === movie.id ? null : movie.id)
                    }
                    onPlayTrailer={() => handlePlayTrailer(movie.id)}
                    cast={activeMovieId === movie.id ? cast : []}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

   
      <TrailerPopup
        trailerKey={selectedTrailerKey}
        onClose={() => setSelectedTrailerKey(null)}
      />
    </div>
  );
}

export default App;
