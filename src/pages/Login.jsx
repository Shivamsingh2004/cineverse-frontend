import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, Loader, Eye, EyeOff } from 'lucide-react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-primary px-4">
      {}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-bg-primary to-bg-primary" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      </div>
      {}
      <div className="relative z-10 w-full max-w-md glass p-8 md:p-10 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
        <div className="text-center mb-8">
          <p className="text-primary font-bold text-xl tracking-wider mb-2">CINEVERSE</p>
          <h2 className="text-3xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-text-muted text-sm">Sign in to continue streaming</p>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm animate-fade-in">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-text-secondary mb-1.5 font-medium">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-primary/80 text-white rounded-[14px] pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all border border-border placeholder-text-muted text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1.5 font-medium">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-primary/80 text-white rounded-[14px] pl-12 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all border border-border placeholder-text-muted text-sm"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-[14px] transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(229,9,20,0.39)] hover:shadow-[0_6px_20px_rgba(229,9,20,0.5)] mt-2"
          >
            {isSubmitting ? <Loader className="animate-spin" size={22} /> : 'Sign In'}
          </button>
        </form>
        <p className="mt-8 text-center text-text-muted text-sm">
          New to CineVerse?{' '}
          <Link to="/register" className="text-white hover:text-primary transition-colors font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
