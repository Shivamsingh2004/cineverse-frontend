import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X, Home, Film, TrendingUp, Heart, User as UserIcon, LogOut, Shield, Bookmark } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };
  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Movies' },
    { to: '/search?q=trending', label: 'Trending' },
    { to: '/watchlist', label: 'My List' },
  ];
  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 h-[75px] px-4 md:px-8 lg:px-12 flex items-center justify-between ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#0F0F13]/85 backdrop-blur-[18px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        {}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-primary tracking-wider select-none">
            CINEVERSE
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {}
        <div className="hidden md:flex items-center gap-4">
          {}
          <form onSubmit={handleSearch} className="relative">
            <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'w-64' : 'w-8'}`}>
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-text-secondary hover:text-white transition z-10"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              {searchOpen && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="absolute right-0 w-64 bg-bg-secondary border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary animate-fade-in"
                  autoFocus
                />
              )}
            </div>
          </form>
          <button className="text-text-secondary hover:text-white transition relative" aria-label="Notifications">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          {user ? (
            <div className="group relative">
              <button className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </button>
              <div className="absolute right-0 mt-2 w-56 glass rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.5)] py-2 hidden group-hover:block animate-slide-down">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <p className="text-xs text-text-muted truncate">{user.email}</p>
                </div>
                <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                  <UserIcon size={16} /> Profile
                </Link>
                <Link to="/favorites" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                  <Heart size={16} /> Favorites
                </Link>
                <Link to="/watchlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                  <Bookmark size={16} /> Watchlist
                </Link>
                {user.role === 'Admin' && (
                  <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                    <Shield size={16} /> Admin Dashboard
                  </Link>
                )}
                <div className="border-t border-border mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]"
            >
              Sign In
            </Link>
          )}
        </div>
        {}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      {}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-72 h-full bg-bg-secondary shadow-2xl animate-slide-down overflow-y-auto">
            <div className="pt-20 pb-8 px-6">
              {}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="w-full bg-bg-primary border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </form>
              {}
              <nav className="space-y-1 mb-6">
                {[
                  { to: '/', icon: Home, label: 'Home' },
                  { to: '/search', icon: Film, label: 'Movies' },
                  { to: '/search?q=trending', icon: TrendingUp, label: 'Trending' },
                  { to: '/watchlist', icon: Bookmark, label: 'My List' },
                  { to: '/favorites', icon: Heart, label: 'Favorites' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <link.icon size={20} />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </nav>
              {}
              <div className="border-t border-border pt-6">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 mb-4 px-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-text-muted">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <UserIcon size={20} /> Profile
                    </Link>
                    {user.role === 'Admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <Shield size={20} /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-xl transition-colors mt-2"
                    >
                      <LogOut size={20} /> Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-3 px-4">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-xl transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center border border-border text-white font-semibold py-3 rounded-xl hover:bg-white/5 transition-all"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
