// src/utils/localStorage.js

export const saveToFavorites = (movie) => {
    const favorites = getFavorites();
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
  export const removeFromFavorites = (movieId) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  
  export const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  };
  