import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, User as UserIcon, Loader, Eye, EyeOff } from 'lucide-react';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const getStrength = (pw) => {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };
  const strength = getStrength(password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength];
  const strengthColor = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-400'][strength];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setIsSubmitting(true);
    setError('');
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-primary px-4 py-20">
      {}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-bg-primary to-bg-primary" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      </div>
      {}
      <div className="relative z-10 w-full max-w-md glass p-8 md:p-10 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
        <div className="text-center mb-8">
          <p className="text-primary font-bold text-xl tracking-wider mb-2">CINEVERSE</p>
          <h2 className="text-3xl font-bold text-white mb-1">Create Account</h2>
          <p className="text-text-muted text-sm">Join millions of movie lovers</p>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm animate-fade-in">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1.5 font-medium">Full Name</label>
            <div className="relative">
              <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-bg-primary/80 text-white rounded-[14px] pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all border border-border placeholder-text-muted text-sm"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
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
                placeholder="Create a strong password"
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
            {}
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < strength ? strengthColor : 'bg-border'}`} />
                  ))}
                </div>
                <p className={`text-xs ${strength >= 4 ? 'text-green-400' : strength >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {strengthLabel}
                </p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1.5 font-medium">Confirm Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-bg-primary/80 text-white rounded-[14px] pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all border placeholder-text-muted text-sm ${
                  confirmPassword && confirmPassword !== password ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Re-enter your password"
                required
              />
            </div>
            {confirmPassword && confirmPassword !== password && (
              <p className="text-red-400 text-xs mt-1">Passwords don't match</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-[14px] transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(229,9,20,0.39)] hover:shadow-[0_6px_20px_rgba(229,9,20,0.5)] mt-2"
          >
            {isSubmitting ? <Loader className="animate-spin" size={22} /> : 'Create Account'}
          </button>
        </form>
        <p className="mt-8 text-center text-text-muted text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-primary transition-colors font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
