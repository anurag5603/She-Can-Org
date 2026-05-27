import React, { useState, useRef, useEffect } from 'react';
import { Heart, Home, LogOut, Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.nav 
      className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto select-none font-sans"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="bg-white/75 backdrop-blur-lg rounded-[2rem] border border-white/80 shadow-[0_10px_35px_rgba(244,63,94,0.06)] px-6 py-3 flex justify-between items-center transition-all duration-300 hover:shadow-[0_15px_40px_rgba(244,63,94,0.1)]">
        {/* Brand Logo with animated gradient and bouncing emblem */}
        <motion.div 
          className="flex items-center cursor-pointer select-none"
          onClick={onHomeClick}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-tr from-[#fe521e] to-[#ff7d54] rounded-2xl flex items-center justify-center mr-3 shadow-lg shadow-orange-100"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <Heart className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xl sm:text-2xl font-black text-[#070f26] tracking-tight">
            She <span className="font-satisfy text-[#fe521e] font-normal italic">Can!</span>
          </span>
        </motion.div>

        {/* Mid Nav Links with sliding hover states */}
        <div className="hidden md:flex items-center space-x-1">
          {showHomeButton && (
            <motion.button
              onClick={onHomeClick}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-[#fe521e] font-extrabold text-sm rounded-full transition-colors relative"
              whileHover={{ y: -1 }}
            >
              <Home className="w-4 h-4 mr-1.5" />
              Home
            </motion.button>
          )}

          <motion.button
            onClick={onFeaturesClick}
            className="px-5 py-2 text-gray-600 hover:text-[#fe521e] font-extrabold text-sm rounded-full transition-all relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -1 }}
          >
            Our Pillars
          </motion.button>

          <motion.button
            onClick={onHowItWorksClick}
            className="px-5 py-2 text-gray-600 hover:text-[#fe521e] font-extrabold text-sm rounded-full transition-all relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -1 }}
          >
            Success Stories
          </motion.button>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-3">
          {/* Join Us CTA */}
          <motion.a
            href="/contact.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] text-white px-5 py-2.5 rounded-full font-extrabold hover:scale-105 transition-all text-sm shadow-md shadow-orange-100/50 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Join Us
          </motion.a>

          {/* Admin link */}
          {user?.isAdmin && onAdminClick && (
            <motion.button
              onClick={onAdminClick}
              className="hidden sm:flex items-center px-5 py-2 border border-orange-200 text-[#fe521e] hover:border-orange-300 hover:bg-orange-50/50 rounded-full font-extrabold text-sm transition-all shadow-sm shadow-orange-50"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shield className="w-4 h-4 mr-1.5" />
              Dashboard
            </motion.button>
          )}

          {/* User profile dropdown or Admin trigger */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 p-1.5 pr-3 rounded-full bg-white border border-gray-100 hover:border-pink-100 transition-all shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-orange-200"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fe521e] to-[#ff7d54] flex items-center justify-center text-white font-black text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:block text-xs font-extrabold text-gray-700 max-w-[80px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div 
                    className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 z-50 origin-top-right overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="px-5 py-3.5 border-b border-gray-100 bg-gradient-to-b from-orange-50/20 to-transparent">
                      <p className="font-extrabold text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      {user.isAdmin && (
                        <span className="inline-flex items-center mt-2 px-2.5 py-0.5 bg-orange-100 text-[#fe521e] text-[10px] font-black rounded-full border border-orange-200">
                          <Shield className="w-3 h-3 mr-1" /> Admin Panel
                        </span>
                      )}
                    </div>

                    {user.isAdmin && onAdminClick && (
                      <button
                        onClick={() => { setShowDropdown(false); onAdminClick(); }}
                        className="w-full flex items-center px-5 py-2.5 text-sm font-extrabold text-gray-700 hover:bg-orange-50/50 hover:text-[#fe521e] transition-colors sm:hidden"
                      >
                        <Shield className="w-4 h-4 mr-3 text-[#fe521e]" />
                        Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center px-5 py-2.5 text-sm font-extrabold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              onClick={onLoginClick}
              className="bg-[#070f26] text-white px-6 py-2.5 rounded-full font-extrabold hover:bg-[#122456] hover:scale-105 transition-all text-sm shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Admin Panel
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};