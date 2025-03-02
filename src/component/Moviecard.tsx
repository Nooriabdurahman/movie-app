import { Link } from 'react-router-dom';

const Moviecard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-gray-800 text-white rounded-lg p-4 w-[230px] h-[250px]">
        <img   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-lg h-[120px] w-[200px]" />
        <h3 className="mt-2 text-lg text-left font-semibold">{movie.title}</h3>
        <p className="text-sm text-left">⭐ {movie.vote_average}</p>
      </div>
    </Link>
  );
};

export default Moviecard;
