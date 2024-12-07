import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToFavorites, removeFromFavorites, getFavorites } from '../utils/localStorage';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/MovieCard.scss';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(getFavorites().some((fav) => fav.id === movie.id));
  const [bannerMessage, setBannerMessage] = useState(''); // Add state for banner message
  const navigate = useNavigate();

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(movie.id);
      setBannerMessage('Removed from favorites'); // Set banner message when unliked
    } else {
      saveToFavorites(movie);
      setBannerMessage('Added to favorites'); // Set banner message when liked
    }
    setIsFavorite(!isFavorite);

    // Hide the banner after 3 seconds
    setTimeout(() => {
      setBannerMessage('');
    }, 3000);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-card__image">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          onError={handleImageError}
        />
      </div>
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__favorite" onClick={handleFavoriteToggle}>
          {isFavorite ? (
            <FaHeart className="favorite-icon active" size={24} />
          ) : (
            <FaRegHeart className="favorite-icon" size={24} />
          )}
        </div>
      </div>

      {/* Banner */}
      {bannerMessage && (
        <div className="movie-card__banner">
          {bannerMessage}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
