// TrendingMovies.js
import React from 'react';
import { Link } from 'react-router';

const TrendingMovie = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
    <div className="relative flex-shrink-0 w-[107px] h-[143px] .hide-scrollbar  rounded-lg overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white text-[1px] font-bold">{movie.title}</h3>
        <p className="text-white text-sm">{movie.release_date}</p>
      </div>
    </div>
    </Link>
  );
};

export default TrendingMovie;


