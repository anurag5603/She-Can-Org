import React, { useState, useRef, useEffect } from 'react';
import { Heart, Home, LogOut, Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onHomeClick?: () => void;
  showHomeButton?: boolean;
  onFeaturesClick?: () => void;
  onHowItWorksClick?: () => void;
  onAdminClick?: () => void;
  onLoginClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onHomeClick,
  showHomeButton = false,
  onFeaturesClick,
  onHowItWorksClick,
  onAdminClick,
  onLoginClick,
}) => {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setShowDropdown(false);
    await signOut();
    if (onHomeClick) onHomeClick();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">NutriPlan AI</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {showHomeButton && (
              <button
                onClick={onHomeClick}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium text-sm"
              >
                <Home className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Home</span>
              </button>
            )}

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={onFeaturesClick}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                Features
              </button>
              <button
                onClick={onHowItWorksClick}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                How It Works
              </button>
            </div>

            {/* Admin Dashboard Link (admin only) */}
            {user?.isAdmin && onAdminClick && (
              <button
                onClick={onAdminClick}
                className="hidden sm:flex items-center px-3 py-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all font-medium text-sm"
              >
                <Shield className="w-4 h-4 mr-1.5" />
                Admin
              </button>
            )}

            {/* User Profile or Sign-In */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-all"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-emerald-200"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      {user.isAdmin && (
                        <span className="inline-flex items-center mt-1.5 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                          <Shield className="w-3 h-3 mr-1" /> Admin
                        </span>
                      )}
                    </div>

                    {user.isAdmin && onAdminClick && (
                      <button
                        onClick={() => { setShowDropdown(false); onAdminClick(); }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors sm:hidden"
                      >
                        <Shield className="w-4 h-4 mr-3 text-indigo-500" />
                        Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all hover:scale-105 text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};