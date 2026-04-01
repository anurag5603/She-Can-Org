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
  onFaqClick,
  onHomeClick,
  onContactClick,
  onDisclaimerClick,
}) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NutriPlan AI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Personalized nutrition planning powered by AI. Get science-backed meal plans 
              tailored to your unique health goals and lifestyle.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-emerald-400" />
                <span>Dietitian Approved</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-blue-400" />
                <span>Science-Based</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={onHomeClick}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={onFeaturesClick}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={onHowItWorksClick}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={onFaqClick}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={onContactClick}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={onDisclaimerClick}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Medical Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 NutriPlan AI. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-400 text-sm">contact.manager5603@gmail.com</span>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Medical Disclaimer:</strong> This service is for informational purposes only and is not intended 
            as medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before 
            making changes to your diet or health routine, especially if you have medical conditions or take medications. 
            Our nutrition framework has been reviewed by licensed dietitians, but individual plans are AI-generated 
            and should be reviewed with your healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  );
};