import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQ5MWMxMWY1ZDRhZTg0ZWViNGM1ZTJmMmE1NTcwMyIsIm5iZiI6MTczOTQzNzg0OS4xOTUwMDAyLCJzdWIiOiI2N2FkYjcxOWQ2M2U5ZGVlZWEzNmVhYjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.udB_NDafuioKA2sSnxHFwnI0JZJwAvrTV1yss1SwYW0";
const API_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
};

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500x750?text=No+Poster";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <main className="bg-[#100e24] min-h-screen flex items-center justify-center p-6">
      <div className="bg-[#0f0d23] text-white border p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="text-gray-400 text-xl mb-6">
          {movie.release_date} | {movie.runtime} min
        </p>

        <div className="flex gap-8">
          <img
            className="w-1/3 h-[300px] rounded-lg"
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : PLACEHOLDER_IMAGE}
            alt={movie.title}
          />
          <img
            className="h-[300px] rounded-lg object-cover w-[500px]"
            src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : PLACEHOLDER_IMAGE}
            alt={movie.title}
          />
        </div>

        <p className="mt-6 text-gray-300 text-lg">{movie.overview}</p>
      </div>
    </main>
  );
};

export default MovieDetails;