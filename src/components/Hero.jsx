import { useState, useEffect } from 'react';
import { fetchTmdbData, requests } from '../api/tmdb';
import { Play, Plus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonHero } from './LoadingSkeleton';
const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchTmdbData(requests.fetchTrending);
      if (movies?.length) {
        setMovie(movies[Math.floor(Math.random() * movies.length)]);
      }
    };
    fetchData();
  }, []);
  const truncate = (str, n) => (str?.length > n ? str.substr(0, n - 1) + '...' : str);
  if (!movie) return <SkeletonHero />;
  const bgUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop';
  return (
    <section className="relative h-[85vh] w-full text-white" aria-label="Featured Movie">
      {}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bgUrl}
          alt={movie?.title || movie?.name || 'Featured movie'}
          className={`w-full h-full object-cover origin-center transition-opacity duration-700 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: 'kenburns 20s ease-out infinite alternate' }}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop';
          }}
        />
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        {}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F13] via-[#0F0F13]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#0F0F13]/20" />
      </div>
      {}
      <div className="relative z-10 h-full flex items-center px-4 md:px-12 lg:px-24">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
            <span className="text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-md">
              {Math.round((movie?.vote_average || 0) * 10)}% Match
            </span>
            <span>{movie?.release_date?.substring(0, 4) || movie?.first_air_date?.substring(0, 4)}</span>
          </div>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed drop-shadow-md">
            {truncate(movie?.overview, 180)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/movie/${movie?.id}`}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Play fill="black" size={20} />
              Watch Now
            </Link>
            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105 active:scale-95 border border-white/10">
              <Plus size={20} />
              My List
            </button>
            <Link
              to={`/movie/${movie?.id}`}
              className="hidden sm:flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all border border-white/20 hover:border-white/40"
            >
              <Info size={20} />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
