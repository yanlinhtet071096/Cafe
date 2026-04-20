import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, User, Lock, Mail, ChevronRight, LogOut } from 'lucide-react';

export function AuthPortal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
    } else {
      onClose();
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bakery-dark/80 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-bakery-cream w-full max-w-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Background purely decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-bakery-gold/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
        
        <div className="relative">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold text-bakery-brown mb-3">
              {isSignUp ? 'Join the Family' : 'Welcome Back'}
            </h2>
            <p className="text-bakery-dark/40 font-medium italic">
              {isSignUp ? 'Create your artisanal account' : 'Sign in to access your dashboard'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-bakery-brown/20 group-focus-within:text-bakery-gold transition-colors" size={20} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full pl-12 pr-6 py-4 bg-bakery-warm/30 border-2 border-transparent focus:border-bakery-gold focus:bg-white rounded-2xl outline-none transition-all placeholder:text-bakery-dark/20 text-bakery-brown font-medium"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-bakery-brown/20 group-focus-within:text-bakery-gold transition-colors" size={20} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-6 py-4 bg-bakery-warm/30 border-2 border-transparent focus:border-bakery-gold focus:bg-white rounded-2xl outline-none transition-all placeholder:text-bakery-dark/20 text-bakery-brown font-medium"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-bold text-center"
              >
                {error}
              </motion.p>
            )}

            <button 
              disabled={loading}
              className="w-full py-4 bg-bakery-brown text-bakery-cream rounded-2xl font-bold hover:bg-bakery-dark transition-all shadow-xl shadow-bakery-brown/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  {isSignUp ? 'Initialize Account' : 'Authenticate'}
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm font-bold text-bakery-gold hover:text-bakery-brown transition-colors tracking-widest uppercase"
            >
              {isSignUp ? 'Already a member? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>

          <button 
            onClick={onClose}
            className="mt-6 w-full text-xs font-bold text-bakery-dark/20 hover:text-bakery-dark/40 transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
