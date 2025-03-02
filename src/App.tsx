import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleProduct from './component/singleproduct';
import Moviecard from './component/Moviecard';
import Search from './component/Search';
import TrendingMovie from './component/TrendingMovies';

// Define the type for a movie object
interface Movie {
  id: number;
  title: string;
  poster_path: string | null; // مسیر تصویر می‌تواند null باشد
  vote_average: number;
  release_date: string; // اضافه کردن ویژگی release_date
}
// Define the type for the API response
interface ApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQ5MWMxMWY1ZDRhZTg0ZWViNGM1ZTJmMmE1NTcwMyIsIm5iZiI6MTczOTQzNzg0OS4xOTUwMDAyLCJzdWIiOiI2N2FkYjcxOWQ2M2U5ZGVlZWEzNmVhYjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.udB_NDafuioKA2sSnxHFwnI0JZJwAvrTV1yss1SwYW0";
const API_OPTIONS = {
  method: 'GET',
  headers: { accept: 'application/json', Authorization: `Bearer ${API_KEY}` },
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch initial movies and trending movies
  useEffect(() => {
    fetchMovies();
    fetchTrendingMovies();
  }, []);

  // Debounce search term changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchMovies(searchTerm);
      } else {
        fetchMovies();
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Fetch movies based on query or default popular movies
  const fetchMovies = async (query: string = '') => {
    setIsLoading(true);
    try {
      const encodedQuery = encodeURIComponent(query);

      const url = query
        ? `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`
        : 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc';

      const response = await fetch(url, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.results) {
        setMovieList(data.results);
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch trending movies
  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setTrendingMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      setTrendingMovies([]);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <main className="bg-no-repeat bg-[url('./Capture.PNG')] bg-cover">
              <img className="m-auto" src="/hero.png" alt="Hero" />
              <header className="pt-[20px] pl-[80px]" />
              <div className="wrapper pb-[50px]">
                {/* Search Component */}
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                {/* Trending Movies Section */}
                <section className="text-white text-center px-[80px]">
                  <h2 className="text-[34px] text-left mb-4">Trending Movies</h2>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
                      {trendingMovies.map((movie) => (
                        <TrendingMovie key={movie.id} movie={movie} />
                      ))}
                    </div>
                  )}
                </section>

                {/* Popular Movies Section */}
                <section className="text-white text-center px-[80px]">
                  <h2 className="text-[34px] text-left">Popular</h2>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {movieList.map((movie) => (
                        <Moviecard key={movie.id} movie={movie} />
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </main>
          }
        />

        {/* Movie Details Page */}
        <Route path="/movie/:id" element={<SingleProduct />} />
      </Routes>
    </Router>
  );
};

export default App;