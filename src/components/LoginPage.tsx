import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Shield, Sparkles, ArrowRight, Lock } from 'lucide-react';

interface LoginPageProps {
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  const { signInWithGoogle, signInDemo } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInDemo();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Demo Account');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-violet-100 flex flex-col">
      {/* Minimal Header */}
      <div className="p-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-pink-600 transition-colors group"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 -mt-16">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Top Gradient Banner */}
            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 px-8 py-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">She Can Admin Portal</h1>
              <p className="text-pink-100 text-sm">
                Sign in to review foundation submissions
              </p>
            </div>

            {/* Login Content */}
            <div className="px-8 py-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Demo Sign-In Button */}
              <button
                onClick={handleDemoSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl hover:from-pink-600 hover:to-rose-700 transition-all hover:scale-[1.02] shadow-lg shadow-rose-200 group disabled:opacity-60 disabled:cursor-not-allowed mb-4 font-semibold"
              >
                <Lock className="w-5 h-5 mr-3" />
                <span>Try Demo Admin Login</span>
              </button>

              {/* Google Sign-In Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all group disabled:opacity-60 disabled:cursor-not-allowed text-gray-700 font-semibold"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-pink-500 rounded-full animate-spin mr-3" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="px-4 text-xs text-gray-400 font-medium uppercase">Admin Perks</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-pink-50 rounded-xl">
                  <Sparkles className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-pink-800">Review all form submissions in real-time</span>
                </div>
                <div className="flex items-center p-3 bg-violet-50 rounded-xl">
                  <Shield className="w-5 h-5 text-violet-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-violet-800">Mark submissions read/unread & delete entries</span>
                </div>
                <div className="flex items-center p-3 bg-rose-50 rounded-xl">
                  <Heart className="w-5 h-5 text-rose-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-rose-800">Direct email reply integration</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs mt-6">
            Authorized admin personnel only. Submission details are protected under standard privacy guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
