import React from 'react';
import { Heart, Mail, Shield, Users } from 'lucide-react';

interface FooterProps {
  onFeaturesClick?: () => void;
  onHowItWorksClick?: () => void;
  onFaqClick?: () => void;
  onHomeClick?: () => void;
  onContactClick?: () => void;
  onDisclaimerClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onFeaturesClick,
  onHowItWorksClick,
  onHomeClick,
  onContactClick,
}) => {
  return (
    <footer className="bg-gray-900 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] rounded-lg flex items-center justify-center mr-3 shadow-md shadow-orange-500/20">
                <Heart className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="text-xl font-bold tracking-tight">She Can Foundation</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-sm font-medium leading-relaxed">
              Empowering women and girls globally through education support, mentoring, 
              and professional skill development. We foster equality and build opportunities.
            </p>
            <div className="flex items-center space-x-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-[#fe521e]" />
                <span>Global Sisterhood</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-orange-400" />
                <span>Verified Impact</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-extrabold text-white mb-4 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5 text-gray-400 text-sm font-semibold">
              <li>
                <button
                  onClick={onHomeClick}
                  className="hover:text-[#fe521e] transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={onFeaturesClick}
                  className="hover:text-[#fe521e] transition-colors text-left"
                >
                  Our Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={onHowItWorksClick}
                  className="hover:text-[#fe521e] transition-colors text-left"
                >
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Action */}
          <div>
            <h3 className="text-base font-extrabold text-white mb-4 uppercase tracking-wider">Get Involved</h3>
            <ul className="space-y-2.5 text-gray-400 text-sm font-semibold">
              <li>
                <button
                  onClick={onContactClick}
                  className="hover:text-[#fe521e] transition-colors text-left"
                >
                  Involvement Form
                </button>
              </li>
              <li>
                <a
                  href="mailto:president@shecanfoundation.org"
                  className="hover:text-[#fe521e] transition-colors text-left block"
                >
                  General Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 font-semibold mb-4 md:mb-0">
            © 2026 She Can Foundation. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 font-semibold">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-[#fe521e]" />
              <a href="mailto:president@shecanfoundation.org" className="text-gray-400 hover:text-[#fe521e] transition-colors">
                president@shecanfoundation.org
              </a>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-bold mr-2">Contact:</span>
              <a href="tel:+918283841830" className="text-gray-400 hover:text-[#fe521e] transition-colors">
                +91- 8283841830
              </a>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <p className="text-xs text-gray-500 leading-relaxed italic text-center font-medium max-w-4xl mx-auto">
            "Education is the most powerful weapon which you can use to change the world. 
            When we educate and empower a girl, we empower a community, a nation, and the world." 
            - She Can Foundation is a registered non-profit organization dedicated to fostering gender equality.
          </p>
        </div>
      </div>
    </footer>
  );
};