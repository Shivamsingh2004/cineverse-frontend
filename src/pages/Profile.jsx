import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User as UserIcon, Mail, Calendar, Shield, Film, Heart, Bookmark, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
const Profile = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  const stats = [
    { icon: Film, label: 'Movies Watched', value: '0', color: 'text-blue-400' },
    { icon: Heart, label: 'Favorites', value: (user.favorites?.length || 0).toString(), color: 'text-red-400' },
    { icon: Bookmark, label: 'Watchlist', value: (user.watchlist?.length || 0).toString(), color: 'text-yellow-400' },
    { icon: Star, label: 'Reviews', value: '0', color: 'text-green-400' },
  ];
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-12">
      {}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-bg-secondary to-bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
      </div>
      <div className="px-4 md:px-12 lg:px-24 max-w-5xl mx-auto -mt-20 relative z-10">
        {}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-12 animate-fade-in-up">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-[0_0_30px_rgba(229,9,20,0.3)] border-4 border-bg-primary">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm">
              <span className="flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>
              <span className="flex items-center gap-1.5">
                <Shield size={14} className={user.role === 'Admin' ? 'text-primary' : ''} />
                {user.role}
              </span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> Member since 2026</span>
            </div>
          </div>
          {user.role === 'Admin' && (
            <Link
              to="/admin"
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
        {}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-bg-secondary rounded-2xl p-6 border border-border hover:border-white/10 transition-colors"
            >
              <stat.icon size={24} className={`${stat.color} mb-3`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/favorites"
            className="bg-bg-secondary rounded-2xl p-6 border border-border hover:border-primary/50 transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold">My Favorites</h3>
              <p className="text-text-muted text-sm">Movies you've loved</p>
            </div>
          </Link>
          <Link
            to="/watchlist"
            className="bg-bg-secondary rounded-2xl p-6 border border-border hover:border-primary/50 transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
              <Bookmark size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold">My Watchlist</h3>
              <p className="text-text-muted text-sm">Movies to watch later</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};
export default Profile;
