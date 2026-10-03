import React, { useState } from 'react';
import { Heart, Mail, Lock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export const LoginPage: React.FC = () => {
  const { t } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google sign-in.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sahayak-bg via-sahayak-primaryLight to-sahayak-lavenderLight flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-sahayak-primary mx-auto flex items-center justify-center shadow-warm">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-sahayak-text">Sahayak</h1>
            <p className="text-lg text-sahayak-textMuted mt-1">Your caring AI companion</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-soft border border-sahayak-bgWarm space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-sahayak-text">
              {isSignup ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="text-sahayak-textMuted text-sm mt-1">
              {isSignup ? 'Sign up to get started' : 'Sign in to continue'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-sahayak-textMuted">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sahayak-textLight" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-sahayak-bgWarm bg-sahayak-bg text-lg text-sahayak-text placeholder:text-sahayak-textLight focus:border-sahayak-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-sahayak-textMuted">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sahayak-textLight" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-sahayak-bgWarm bg-sahayak-bg text-lg text-sahayak-text placeholder:text-sahayak-textLight focus:border-sahayak-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="text-sahayak-red text-sm font-medium text-center bg-red-50 py-2 px-4 rounded-xl">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sahayak-primary hover:bg-sahayak-primary/90 text-white font-semibold text-xl py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-warm disabled:opacity-70"
            >
              <span>{isLoading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}</span>
              {!isLoading && <ArrowRight className="w-6 h-6" />}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">OR</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-semibold text-lg py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => { setIsSignup(!isSignup); setError(''); }}
              className="text-sahayak-primary font-medium hover:underline text-base"
            >
              {isSignup ? 'Already have an account? Sign In' : "New user? Create Account"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-sahayak-textLight">
          Sahayak — Designed with love for elderly citizens of India 🇮🇳
        </p>
      </div>
    </div>
  );
};
