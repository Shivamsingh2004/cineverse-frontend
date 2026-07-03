import { useState, useEffect, useRef } from 'react';
import { fetchTmdbData } from '../api/tmdb';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SkeletonCard } from './LoadingSkeleton';
const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMoved, setIsMoved] = useState(false);
  const rowRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchTmdbData(fetchUrl);
      setMovies(data || []);
      setLoading(false);
    };
    fetchData();
  }, [fetchUrl]);
  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  return (
    <section className="mb-12 md:mb-16 px-4 md:px-12 lg:px-24 group/row">
      {}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide">
          {title}
        </h2>
        <button className="text-sm font-medium text-primary hover:text-primary-hover transition-colors opacity-0 group-hover/row:opacity-100">
          View All →
        </button>
      </div>
      {}
      <div className="relative group/slider">
        {}
        <button
          onClick={() => handleClick('left')}
          className={`absolute left-0 top-0 bottom-0 z-30 bg-gradient-to-r from-[#0F0F13]/90 to-transparent w-14 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:from-[#0F0F13] ${
            !isMoved && 'hidden'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={32} className="text-white" />
        </button>
        {}
        <div
          ref={rowRef}
          className="flex items-stretch gap-3 md:gap-4 overflow-x-auto scrollbar-hide py-4 scroll-smooth"
        >
          {loading
            ? Array.from({ length: 7 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          }
        </div>
        {}
        <button
          onClick={() => handleClick('right')}
          className="absolute right-0 top-0 bottom-0 z-30 bg-gradient-to-l from-[#0F0F13]/90 to-transparent w-14 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:from-[#0F0F13]"
          aria-label="Scroll right"
        >
          <ChevronRight size={32} className="text-white" />
        </button>
      </div>
    </section>
  );
};
export default MovieRow;
