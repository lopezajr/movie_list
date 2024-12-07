// src/utils/api.js
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Function to fetch movies (popular movies)
export const fetchMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  return data;
};

// Function to search for movies based on a query
export const searchMovies = async (query) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`
  );
  const data = await response.json();
  return data;
};

// Function to fetch movie details by movie ID
export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
};
