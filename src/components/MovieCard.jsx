import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Plus, Check, Heart, Info } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { user, toggleWatchlist, toggleFavorite } = useContext(AuthContext);
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const isInWatchlist = user?.watchlist?.some(m => String(m.id) === String(movie.id));
  const isInFavorites = user?.favorites?.some(m => String(m.id) === String(movie.id));

  return (
    <div 
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative group min-w-[150px] sm:min-w-[180px] md:min-w-[220px] h-[225px] sm:h-[270px] md:h-[330px] rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-[1.08] hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)] hover:z-20 flex-shrink-0 bg-bg-secondary"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title || movie.name || 'Movie poster'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-bg-secondary text-text-muted text-sm p-4 text-center">
          {movie.title || movie.name || 'No Image'}
        </div>
      )}
      {}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-sm md:text-base mb-1.5 line-clamp-2">
            {movie.title || movie.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-400 text-xs font-bold">
              ★ {(movie.vote_average || 0).toFixed(1)}
            </span>
            <span className="text-gray-400 text-xs">
              {movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4) || ''}
            </span>
          </div>
          {}
          <div className="flex items-center gap-2">
            <Link
              to={`/movie/${movie.id}`}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Play"
            >
              <Play fill="black" size={14} className="ml-0.5" />
            </Link>
            <button
              onClick={(e) => { e.stopPropagation(); toggleWatchlist(movie); }}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                isInWatchlist 
                  ? 'bg-primary border-transparent text-white' 
                  : 'bg-white/10 border-white/30 text-white hover:border-white hover:bg-white/20'
              }`}
              aria-label="Add to watchlist"
            >
              {isInWatchlist ? <Check size={14} /> : <Plus size={16} />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorite(movie); }}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                isInFavorites 
                  ? 'bg-red-600 border-transparent text-white' 
                  : 'bg-white/10 border-white/30 text-white hover:border-white hover:bg-white/20'
              }`}
              aria-label="Add to favorites"
            >
              <Heart size={14} fill={isInFavorites ? "currentColor" : "none"} />
            </button>
            <Link
              to={`/movie/${movie.id}`}
              className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:border-white hover:bg-white/20 transition-colors ml-auto"
              aria-label="More info"
            >
              <Info size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
