import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  LayoutDashboard, Film, Users, Star, Bookmark,
  Plus, Edit3, Trash2, X, Save, AlertCircle
} from 'lucide-react';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    title: '', overview: '', poster_path: '', backdrop_path: '',
    release_date: '', runtime: '', genres: '',
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const [moviesRes, usersRes] = await Promise.all([
        axios.get(`${API}/movies`),
        axios.get(`${API}/users`, { withCredentials: true }).catch(() => ({ data: [] })),
      ]);
      setMovies(moviesRes.data || []);
      setUsers(usersRes.data || []);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    }
    setLoading(false);
  };
  const resetForm = () => {
    setForm({ title: '', overview: '', poster_path: '', backdrop_path: '', release_date: '', runtime: '', genres: '' });
    setEditingMovie(null);
    setShowForm(false);
    setError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.title || !form.overview || !form.release_date) {
      setError('Title, overview, and release date are required.');
      return;
    }
    const payload = {
      ...form,
      runtime: form.runtime ? Number(form.runtime) : undefined,
      genres: form.genres ? form.genres.split(',').map(g => g.trim()) : [],
    };
    try {
      if (editingMovie) {
        await axios.put(`${API}/movies/${editingMovie._id}`, payload, { withCredentials: true });
        setSuccess('Movie updated successfully!');
      } else {
        await axios.post(`${API}/movies`, payload, { withCredentials: true });
        setSuccess('Movie created successfully!');
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save movie');
    }
  };
  const handleEdit = (movie) => {
    setForm({
      title: movie.title || '',
      overview: movie.overview || '',
      poster_path: movie.poster_path || '',
      backdrop_path: movie.backdrop_path || '',
      release_date: movie.release_date || '',
      runtime: movie.runtime?.toString() || '',
      genres: (movie.genres || []).join(', '),
    });
    setEditingMovie(movie);
    setShowForm(true);
    setError('');
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      await axios.delete(`${API}/movies/${id}`, { withCredentials: true });
      setSuccess('Movie deleted.');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete movie');
    }
  };
  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'movies', icon: Film, label: 'Movies' },
    { id: 'users', icon: Users, label: 'Users' },
  ];
  const stats = [
    { label: 'Total Movies', value: movies.length, icon: Film, color: 'bg-blue-500/10 text-blue-400' },
    { label: 'Total Users', value: users.length, icon: Users, color: 'bg-green-500/10 text-green-400' },
    { label: 'Total Reviews', value: movies.reduce((acc, m) => acc + (m.reviews?.length || 0), 0), icon: Star, color: 'bg-yellow-500/10 text-yellow-400' },
    { label: 'Watchlists', value: users.reduce((acc, u) => acc + (u.watchlist?.length || 0), 0), icon: Bookmark, color: 'bg-purple-500/10 text-purple-400' },
  ];
  return (
    <div className="min-h-screen bg-bg-primary pt-[75px] flex">
      {}
      <aside className="hidden md:flex flex-col w-64 bg-bg-secondary border-r border-border p-6 fixed top-[75px] bottom-0 left-0 z-30">
        <p className="text-xs text-text-muted uppercase tracking-wider mb-6 font-semibold">Admin Panel</p>
        <nav className="space-y-1 flex-grow">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-white font-semibold">{user?.name}</p>
          <p className="text-xs text-text-muted">{user?.email}</p>
        </div>
      </aside>
      {}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-border flex z-50">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
              activeTab === item.id ? 'text-primary' : 'text-text-muted'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </div>
      {}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8">
        {}
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2 animate-fade-in">
            ✓ {success}
            <button onClick={() => setSuccess('')} className="ml-auto hover:text-white"><X size={16} /></button>
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2 animate-fade-in">
            <AlertCircle size={16} /> {error}
            <button onClick={() => setError('')} className="ml-auto hover:text-white"><X size={16} /></button>
          </div>
        )}
        {}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-bg-secondary rounded-2xl p-6 border border-border">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-text-muted text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
            {}
            <h2 className="text-lg font-semibold text-white mb-4">Recent Movies (MongoDB)</h2>
            {movies.length > 0 ? (
              <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-text-muted text-left">
                      <th className="px-6 py-4 font-medium">Title</th>
                      <th className="px-6 py-4 font-medium hidden md:table-cell">Release Date</th>
                      <th className="px-6 py-4 font-medium hidden sm:table-cell">Rating</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.slice(0, 5).map((movie) => (
                      <tr key={movie._id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{movie.title}</td>
                        <td className="px-6 py-4 text-text-secondary hidden md:table-cell">{movie.release_date}</td>
                        <td className="px-6 py-4 text-yellow-400 hidden sm:table-cell">★ {(movie.vote_average || 0).toFixed(1)}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => { setActiveTab('movies'); handleEdit(movie); }} className="text-text-muted hover:text-white transition"><Edit3 size={16} /></button>
                            <button onClick={() => handleDelete(movie._id)} className="text-text-muted hover:text-red-400 transition"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-text-muted text-sm bg-bg-secondary rounded-2xl border border-border p-6">No movies in database yet. Add one from the Movies tab.</p>
            )}
          </div>
        )}
        {}
        {activeTab === 'movies' && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Manage Movies</h1>
              <button
                onClick={() => { resetForm(); setShowForm(true); }}
                className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 flex items-center gap-2"
              >
                <Plus size={18} /> Add Movie
              </button>
            </div>
            {}
            {showForm && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in px-4" onClick={() => resetForm()}>
                <div className="w-full max-w-lg bg-bg-secondary rounded-2xl border border-border p-6 md:p-8 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
                    <button onClick={resetForm} className="text-text-muted hover:text-white transition"><X size={22} /></button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Title *</label>
                      <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Overview *</label>
                      <textarea value={form.overview} onChange={(e) => setForm({...form, overview: e.target.value})} rows={3} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-text-secondary mb-1.5">Release Date *</label>
                        <input type="date" value={form.release_date} onChange={(e) => setForm({...form, release_date: e.target.value})} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                      </div>
                      <div>
                        <label className="block text-sm text-text-secondary mb-1.5">Runtime (min)</label>
                        <input type="number" value={form.runtime} onChange={(e) => setForm({...form, runtime: e.target.value})} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Poster URL</label>
                      <input type="text" value={form.poster_path} onChange={(e) => setForm({...form, poster_path: e.target.value})} placeholder="/poster.jpg or full URL" className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder-text-muted" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Backdrop URL</label>
                      <input type="text" value={form.backdrop_path} onChange={(e) => setForm({...form, backdrop_path: e.target.value})} placeholder="/backdrop.jpg or full URL" className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder-text-muted" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Genres (comma-separated)</label>
                      <input type="text" value={form.genres} onChange={(e) => setForm({...form, genres: e.target.value})} placeholder="Action, Sci-Fi, Thriller" className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder-text-muted" />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Save size={18} />
                      {editingMovie ? 'Update Movie' : 'Create Movie'}
                    </button>
                  </form>
                </div>
              </div>
            )}
            {}
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-16 skeleton rounded-xl" />
                ))}
              </div>
            ) : movies.length > 0 ? (
              <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-text-muted text-left">
                      <th className="px-6 py-4 font-medium">Title</th>
                      <th className="px-6 py-4 font-medium hidden md:table-cell">Release Date</th>
                      <th className="px-6 py-4 font-medium hidden sm:table-cell">Genres</th>
                      <th className="px-6 py-4 font-medium hidden sm:table-cell">Reviews</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map((movie) => (
                      <tr key={movie._id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{movie.title}</td>
                        <td className="px-6 py-4 text-text-secondary hidden md:table-cell">{movie.release_date}</td>
                        <td className="px-6 py-4 text-text-secondary hidden sm:table-cell">{(movie.genres || []).join(', ') || '—'}</td>
                        <td className="px-6 py-4 text-text-secondary hidden sm:table-cell">{movie.reviews?.length || 0}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button onClick={() => handleEdit(movie)} className="text-text-muted hover:text-blue-400 transition" aria-label="Edit"><Edit3 size={16} /></button>
                            <button onClick={() => handleDelete(movie._id)} className="text-text-muted hover:text-red-400 transition" aria-label="Delete"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-bg-secondary rounded-2xl border border-border">
                <Film size={40} className="text-text-muted mb-4" />
                <p className="text-white text-lg mb-2">No movies in the database</p>
                <p className="text-text-muted text-sm">Click "Add Movie" to create your first entry</p>
              </div>
            )}
          </div>
        )}
        {}
        {activeTab === 'users' && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Manage Users</h1>
            {users.length > 0 ? (
              <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-text-muted text-left">
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium hidden sm:table-cell">Email</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium hidden md:table-cell">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-xs font-bold">
                              {u.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-white font-medium">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-secondary hidden sm:table-cell">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            u.role === 'Admin' ? 'bg-primary/15 text-primary' : 'bg-white/8 text-text-secondary'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-text-secondary hidden md:table-cell">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-bg-secondary rounded-2xl border border-border">
                <Users size={40} className="text-text-muted mb-4" />
                <p className="text-white text-lg mb-2">No users found</p>
                <p className="text-text-muted text-sm">Users will appear here once they register</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
export default AdminDashboard;
