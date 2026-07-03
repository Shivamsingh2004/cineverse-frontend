import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bookmark, Trash2 } from 'lucide-react';
import Footer from '../components/Footer';
const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const watchlist = user?.watchlist || [];
  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-12">
      <div className="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Watchlist</h1>
          <p className="text-text-secondary mb-10">Movies you've saved to watch later</p>
        </div>
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlist.map((movie, index) => (
              <div key={movie.id || index} className="relative group rounded-[18px] overflow-hidden bg-bg-secondary aspect-[2/3]">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || 'Movie'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted text-sm p-4 text-center">
                    {movie.title || 'Unknown'}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="text-red-400 hover:text-red-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-white text-sm font-medium line-clamp-1">{movie.title || 'Unknown'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-bg-secondary flex items-center justify-center text-text-muted mb-6">
              <Bookmark size={36} />
            </div>
            <p className="text-xl text-white mb-2">Your watchlist is empty</p>
            <p className="text-text-muted max-w-md">
              Browse movies and click the + button to add them to your watchlist. They'll appear here for easy access.
            </p>
          </div>
        )}
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};
export default Watchlist;
