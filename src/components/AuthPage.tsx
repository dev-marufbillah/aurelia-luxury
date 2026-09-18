import { useState } from 'react';
import { login, register, AuthUser } from '../auth';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  onSuccess: (user: AuthUser) => void;
  onBack: () => void;
}

export default function AuthPage({ onSuccess, onBack }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const res = login(email || phone, password);
      setLoading(false);
      if (res.ok && res.user) onSuccess(res.user);
      else setError(res.error || 'Login failed.');
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const res = register({ name, email, phone, password });
      setLoading(false);
      if (res.ok && res.user) onSuccess(res.user);
      else setError(res.error || 'Registration failed.');
    }, 800);
  };

  const handleGooglePlaceholder = () => {
    setError('Google Sign-In requires server-side OAuth integration. Please use Email/Phone login.');
  };

  return (
    <div className="min-h-screen bg-aurelia-black flex items-center justify-center p-4 animate-fade-in font-montserrat">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aurelia-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aurelia-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold text-aurelia-gold tracking-[0.2em] mb-2 uppercase">AURELIA</h1>
          <p className="text-aurelia-muted text-[9px] uppercase tracking-[0.5em]">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </p>
        </div>

        <div className="bg-[#111] border border-white/5 p-8 md:p-10">
          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-8">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 pb-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors border-b-2 ${
                mode === 'login' ? 'text-aurelia-gold border-aurelia-gold' : 'text-aurelia-muted border-transparent'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 pb-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors border-b-2 ${
                mode === 'register' ? 'text-aurelia-gold border-aurelia-gold' : 'text-aurelia-muted border-transparent'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[9px] text-aurelia-muted uppercase tracking-[0.3em] font-bold mb-2">Email or Phone</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-sm text-aurelia-ivory focus:outline-none focus:border-aurelia-gold transition-all"
                  placeholder="email@example.com or 01XXXXXXXXX"
                />
              </div>
              <div className="relative">
                <label className="block text-[9px] text-aurelia-muted uppercase tracking-[0.3em] font-bold mb-2">Password</label>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-sm text-aurelia-ivory focus:outline-none focus:border-aurelia-gold transition-all pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 bottom-3 text-aurelia-muted hover:text-aurelia-gold">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-4 bg-aurelia-gold text-aurelia-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-aurelia-ivory transition-all disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-[9px] text-aurelia-muted uppercase tracking-[0.3em] font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-sm text-aurelia-ivory focus:outline-none focus:border-aurelia-gold transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-[9px] text-aurelia-muted uppercase tracking-[0.3em] font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-sm text-aurelia-ivory focus:outline-none focus:border-aurelia-gold transition-all"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-[9px] text-aurelia-muted uppercase tracking-[0.3em] font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-sm text-aurelia-ivory focus:outline-none focus:border-aurelia-gold transition-all"
                  placeholder="01XXXXXXXXX"
                />
              </div>
              <div className="relative">
                <label className="block text-[9px] text-aurelia-muted uppercase tracking-[0.3em] font-bold mb-2">Password</label>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-sm text-aurelia-ivory focus:outline-none focus:border-aurelia-gold transition-all pr-10"
                  placeholder="Min 8 chars (Aa1@)"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 bottom-3 text-aurelia-muted hover:text-aurelia-gold">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[9px] text-aurelia-muted tracking-wide">
                Must have: uppercase, lowercase, number, and special character
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-4 bg-aurelia-gold text-aurelia-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-aurelia-ivory transition-all disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Google placeholder */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <button
              onClick={handleGooglePlaceholder}
              className="w-full py-3 border border-white/10 text-aurelia-ivory/70 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-aurelia-gold hover:text-aurelia-gold transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </div>

          <button onClick={onBack} className="w-full mt-5 text-[10px] text-aurelia-muted hover:text-aurelia-gold transition-colors uppercase tracking-widest">
            <ArrowLeft className="inline w-3 h-3 mr-1" /> Return to Store
          </button>
        </div>
      </div>
    </div>
  );
}
