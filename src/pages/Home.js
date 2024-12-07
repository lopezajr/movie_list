// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { fetchMovies, searchMovies } from '../utils/api'; // Import the searchMovies function
import '../styles/Home.scss'

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch movies when the component mounts
  useEffect(() => {
    setLoading(true);
    fetchMovies().then((data) => {
      setMovies(data.results);
      setLoading(false);
    });
  }, []);

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      fetchMovies().then((data) => {
        setMovies(data.results); // Reset movies when search is cleared
      });
    } else {
      setLoading(true);
      searchMovies(query).then((data) => {
        setMovies(data.results);
        setLoading(false);
      });
    }
  };

  return (
    <div className="home">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)} // Trigger search on input change
        />
      </div>
      <div className="movie-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>No movies found</p>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
