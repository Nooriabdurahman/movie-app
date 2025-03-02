import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Moviecard from './component/Moviecard';
import TrendingMovie from './component/TrendingMovies'; 
import MovieDetails from './component/singleproduct';
import Search from './component/Search';

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQ5MWMxMWY1ZDRhZTg0ZWViNGM1ZTJmMmE1NTcwMyIsIm5iZiI6MTczOTQzNzg0OS4xOTUwMDAyLCJzdWIiOiI2N2FkYjcxOWQ2M2U5ZGVlZWEzNmVhYjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.udB_NDafuioKA2sSnxHFwnI0JZJwAvrTV1yss1SwYW0";
const API_OPTIONS = {
  method: 'GET',
  headers: { accept: 'application/json', Authorization: `Bearer ${API_KEY}` },
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies(); 
    fetchTrendingMovies(); 
  }, []); 

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

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    try {
      const encodedQuery = encodeURIComponent(query);
      
      const url = query
        ? `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`
        : 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc';
      
      const response = await fetch(url, API_OPTIONS);
      const data = await response.json();
      
      console.log(data); 

      if (data.results) {
        setMovieList(data.results); 
      } else {
        setMovieList([]); 
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', API_OPTIONS);
      const data = await response.json();
      setTrendingMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <main className="bg-no-repeat bg-[url('./Capture.PNG')] bg-cover">
            <img className='m-auto' src="/hero.png" alt="fwe" />
            <header className="pt-[20px] pl-[80px]" />
            <div className="wrapper pb-[50px]">
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              
              {/* Trending Movies */}
              <section className="text-white text-center px-[80px]">
                <h2 className="text-[34px] text-left mb-4">Trending Movies</h2>
                {isLoading ? <p>Loading...</p> : (
                  <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
                    {trendingMovies.map(movie => (
                      <TrendingMovie key={movie.id} movie={movie} />
                    ))}
                  </div>
                )}
              </section>

              {/* Popular Movies */}
              <section className="text-white text-center px-[80px]">
                <h2 className="text-[34px] text-left">Popular</h2>
                {isLoading ? <p>Loading...</p> : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movieList.map(movie => (
                      <Moviecard key={movie.id} movie={movie} />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </main>
        } />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;