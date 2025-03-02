import React from 'react';
import { Link } from 'react-router-dom';

// تعریف نوع Movie
interface Movie {
  id: number;
  title: string;
  poster_path: string | null; // مسیر تصویر می‌تواند null باشد
  vote_average: number;
  release_date: string; // تاریخ انتشار
}

interface TrendingMovieProps {
  movie: Movie;
}

const TrendingMovie: React.FC<TrendingMovieProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="relative flex-shrink-0 w-[107px] h-[143px] rounded-lg overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/107x143?text=No+Poster"
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <h3 className="text-white text-xs font-bold truncate">{movie.title}</h3>
          <p className="text-white text-[10px]">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default TrendingMovie;