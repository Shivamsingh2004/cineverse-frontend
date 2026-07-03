import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Watchlist from './pages/Watchlist';
import Favorites from './pages/Favorites';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-bg-primary text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            {}
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            <Route path="/watchlist" element={
              <ProtectedRoute><Watchlist /></ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute><Favorites /></ProtectedRoute>
            } />
            {}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
            } />
            {}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <p className="text-xl text-white mb-2">Page Not Found</p>
                <p className="text-text-muted mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105">
                  Back to Home
                </a>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
