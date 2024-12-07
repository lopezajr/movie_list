import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  saveToFavorites,
  removeFromFavorites as removeFromLocalStorage,
  getFavorites,
} from "../utils/localStorage";
import { fetchMovieDetails } from "../utils/api";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import Font Awesome icons
import "../styles/MovieDetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bannerMessage, setBannerMessage] = useState(""); // Add state for banner message

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);

      // Check if the movie is in favorites
      setIsFavorite(getFavorites().some((fav) => fav.id === data.id));
    };
    getMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromLocalStorage(movie.id); // Remove from favorites
      setBannerMessage("Removed from favorites"); // Set banner message
    } else {
      saveToFavorites(movie); // Add to favorites
      setBannerMessage("Added to favorites"); // Set banner message
    }
    setIsFavorite(!isFavorite);

    // Hide the banner after 3 seconds
    setTimeout(() => {
      setBannerMessage("");
    }, 3000);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-detail__poster"
      />
      <p>{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>

      {/* Favorite Heart Icon */}
      <div
        onClick={handleFavoriteToggle}
        className={`movie-detail__favorite ${isFavorite ? "is-favorite" : ""}`}
        role="button"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        tabIndex={0}
      >
        {isFavorite ? <FaHeart size={32} /> : <FaRegHeart size={32} />}
      </div>

      {/* Banner */}
      {bannerMessage && (
        <div className="movie-detail__banner">
          {bannerMessage}
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
