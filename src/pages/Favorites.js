// src/pages/Favorites.js
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getFavorites } from '../utils/localStorage';
import '../styles/Favorites.scss'

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteMovies = getFavorites();
    setFavorites(favoriteMovies);
  }, []);

  return (
    <div className="favorites">
      <h2>Favorite Movies</h2>
      <div className="movie-list">
        {favorites.length === 0 ? (
          <p>No favorite movies yet.</p>
        ) : (
          favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default Favorites;
