import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchTmdbMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { Search as SearchIcon, X, Film } from 'lucide-react';
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const searchMovies = useCallback(async (q) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    const data = await searchTmdbMovies(q);
    setResults(data);
    setLoading(false);
  }, []);
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      searchMovies(q);
    }
  }, [searchParams, searchMovies]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      searchMovies(query.trim());
    }
  };
  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-12">
      <div className="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {}
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Search Movies
          </h1>
          <form onSubmit={handleSubmit} className="relative max-w-2xl">
            <SearchIcon
              size={22}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, actors, or genres..."
              className="w-full bg-bg-secondary border border-border rounded-2xl pl-14 pr-12 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-text-muted"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setResults([]); setSearched(false); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition"
              >
                <X size={20} />
              </button>
            )}
          </form>
        </div>
        {}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] skeleton rounded-[18px]" />
            ))}
          </div>
        ) : results.length > 0 ? (
          <>
            <p className="text-text-secondary mb-6 text-sm">{results.length} results for "{searchParams.get('q')}"</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {results.map((movie) => (
                <div key={movie.id} className="w-full">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </>
        ) : searched ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Film size={48} className="text-text-muted mb-4" />
            <p className="text-xl text-white mb-2">No results found</p>
            <p className="text-text-muted">Try searching for another movie or check your spelling</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SearchIcon size={48} className="text-text-muted mb-4" />
            <p className="text-xl text-white mb-2">Discover your next favorite movie</p>
            <p className="text-text-muted">Start typing to search across thousands of movies</p>
          </div>
        )}
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};
export default Search;
