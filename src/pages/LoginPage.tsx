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
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      if (isSignup) {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        if (data.user && data.session === null) {
          setSuccessMsg('Account created! Please check your email to verify your account.');
          return;
        }
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
            
            {successMsg && (
              <p className="text-green-700 text-sm font-medium text-center bg-green-50 py-2 px-4 rounded-xl">{successMsg}</p>
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
