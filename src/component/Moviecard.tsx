import React from "react";
import { Link } from "react-router-dom";

// Define the type for the movie object
interface Movie {
  id: number;
  title: string;
  poster_path: string | null; // poster_path can be null if no image is available
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
}

const Moviecard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-gray-800 text-white rounded-lg p-4 w-[230px] h-[250px]">
        {/* Handle cases where poster_path is null */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/200x120?text=No+Poster"
          }
          alt={movie.title}
          className="rounded-lg h-[120px] w-[200px]"
        />
        <h3 className="mt-2 text-lg text-left font-semibold">{movie.title}</h3>
        <p className="text-sm text-left">⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </Link>
  );
};

export default Moviecard;