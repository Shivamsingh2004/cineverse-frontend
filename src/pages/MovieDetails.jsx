import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTmdbDetails, fetchTmdbData } from '../api/tmdb';
import { Play, Plus, Heart, Share2, Star, Clock, Globe, ArrowLeft, X } from 'lucide-react';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      const data = await fetchTmdbDetails(id);
      setMovie(data);
      setLoading(false);
    };
    getDetails();
  }, [id]);
  useEffect(() => {
    if (movie?.videos?.results) {
      const trailer = movie.videos.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) setTrailerKey(trailer.key);
    }
  }, [movie]);
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setTrailerOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!movie) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center text-white gap-4">
        <p className="text-xl">Movie not found</p>
        <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
      </div>
    );
  }
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop';
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  return (
    <div className="bg-bg-primary min-h-screen text-white">
      {}
      <Link
        to="/"
        className="fixed top-20 left-4 md:left-8 z-30 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium transition-all"
      >
        <ArrowLeft size={16} /> Back
      </Link>
      {}
      <div className="relative h-[50vh] md:h-[65vh] w-full">
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-[#0F0F13]/70 to-[#0F0F13]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F13]/80 to-transparent" />
        </div>
      </div>
      {}
      <div className="relative z-10 px-4 md:px-12 lg:px-24 -mt-40 md:-mt-56 flex flex-col md:flex-row gap-8 lg:gap-12 mb-16 animate-fade-in-up">
        {}
        {posterUrl && (
          <div className="hidden md:block flex-shrink-0 w-64 lg:w-72 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 self-start">
            <img
              src={posterUrl}
              alt={movie.title || movie.name}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        {}
        <div className="flex-grow pt-4 md:pt-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md leading-tight">
            {movie.title || movie.name}
          </h1>
          {}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg font-bold">
              <Star size={14} fill="currentColor" />
              {(movie.vote_average || 0).toFixed(1)}
            </span>
            <span className="text-text-secondary">
              {movie.release_date?.substring(0, 4)}
            </span>
            {movie.runtime > 0 && (
              <span className="flex items-center gap-1 text-text-secondary">
                <Clock size={14} />
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            )}
            <span className="flex items-center gap-1 uppercase text-text-secondary border border-border px-2 py-0.5 rounded text-xs">
              <Globe size={12} />
              {movie.original_language || 'EN'}
            </span>
          </div>
          {}
          <div className="flex flex-wrap gap-2 mb-8">
            {(movie.genres || []).map((genre) => (
              <span
                key={genre.id || genre.name}
                className="px-3 py-1.5 bg-white/8 rounded-full text-sm text-text-secondary hover:bg-white/15 hover:text-white transition cursor-default border border-white/5"
              >
                {genre.name || genre}
              </span>
            ))}
          </div>
          {}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mb-10">
            {movie.overview}
          </p>
          {}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => trailerKey && setTrailerOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(229,9,20,0.4)]"
            >
              <Play fill="currentColor" size={20} />
              {trailerKey ? 'Watch Trailer' : 'No Trailer'}
            </button>
            <button className="flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105 border border-white/10">
              <Plus size={20} />
              Watchlist
            </button>
            <button className="w-14 h-14 flex items-center justify-center bg-white/8 hover:bg-white/15 rounded-xl transition-all hover:scale-105 text-white border border-white/10">
              <Heart size={22} />
            </button>
            <button className="w-14 h-14 flex items-center justify-center bg-white/8 hover:bg-white/15 rounded-xl transition-all hover:scale-105 text-white border border-white/10">
              <Share2 size={22} />
            </button>
          </div>
        </div>
      </div>
      {}
      <div className="pb-8">
        <MovieRow title="You Might Also Like" fetchUrl={`/movie/${id}/similar`} />
      </div>
      {}
      {trailerOpen && trailerKey && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setTrailerOpen(false)}>
          <div className="relative w-[90vw] max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setTrailerOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition z-10"
              aria-label="Close trailer"
            >
              <X size={28} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default MovieDetails;
