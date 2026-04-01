import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FeaturesPage } from './components/FeaturesPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { ContactPage } from './components/ContactPage';
import { DisclaimerPage } from './components/DisclaimerPage';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Questionnaire } from './components/Questionnaire';
import { DietPlanDisplay } from './components/DietPlanDisplay';
import { generateDietPlan } from './utils/openai';
import { QuestionnaireData, DietPlan } from './types';
import { Heart, Sparkles, Users, Shield } from 'lucide-react';

type AppState = 'landing' | 'features' | 'how-it-works' | 'questionnaire' | 'plan' | 'contact' | 'disclaimer' | 'login' | 'admin';

function AppContent() {
  const { user, isLoading: authLoading } = useAuth();
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [userData, setUserData] = useState<QuestionnaireData | null>(null);

  const handleStartQuestionnaire = () => {
    if (!user) {
      // Not logged in — redirect to login first
      setCurrentState('login');
      return;
    }
    setCurrentState('questionnaire');
  };

  const handleQuestionnaireComplete = async (data: QuestionnaireData) => {
    setIsLoading(true);
    setUserData(data);

    try {
      const plan = await generateDietPlan(data);
      setDietPlan(plan);
      setCurrentState('plan');
    } catch (error: any) {
      console.error('Error generating plan:', error);
      alert('Error: ' + (error?.message || JSON.stringify(error)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentState('landing');
    setDietPlan(null);
    setUserData(null);
  };

  const handleNavigation = (page: AppState) => {
    setCurrentState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFaqClick = () => {
    setCurrentState('how-it-works');
    setTimeout(() => {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Common navbar props
  const navProps = {
    onHomeClick: handleRestart,
    onFeaturesClick: () => handleNavigation('features'),
    onHowItWorksClick: () => handleNavigation('how-it-works'),
    onAdminClick: user?.isAdmin ? () => handleNavigation('admin') : undefined,
    onLoginClick: () => handleNavigation('login'),
  };

  const footerProps = {
    onFeaturesClick: () => handleNavigation('features'),
    onHowItWorksClick: () => handleNavigation('how-it-works'),
    onFaqClick: handleFaqClick,
    onHomeClick: handleRestart,
    onContactClick: () => handleNavigation('contact'),
    onDisclaimerClick: () => handleNavigation('disclaimer'),
  };

  // ── LOGIN PAGE ──
  if (currentState === 'login') {
    // If user just signed in, redirect to questionnaire
    if (user) {
      setCurrentState('questionnaire');
      return null;
    }
    return <LoginPage onBack={handleRestart} />;
  }

  // ── ADMIN DASHBOARD (admin only) ──
  if (currentState === 'admin') {
    if (!user?.isAdmin) {
      setCurrentState('landing');
      return null;
    }
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar {...navProps} showHomeButton={true} />
        <div className="flex-1">
          <AdminDashboard onBack={handleRestart} />
        </div>
      </div>
    );
  }

  // ── QUESTIONNAIRE (requires auth) ──
  if (currentState === 'questionnaire') {
    if (!user) {
      setCurrentState('login');
      return null;
    }
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar {...navProps} showHomeButton={true} />
        <div className="flex-1">
          <Questionnaire
            onComplete={handleQuestionnaireComplete}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  // ── FEATURES ──
  if (currentState === 'features') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar {...navProps} showHomeButton={true} />
        <div className="flex-1">
          <FeaturesPage />
        </div>
        <Footer {...footerProps} />
      </div>
    );
  }

  // ── HOW IT WORKS ──
  if (currentState === 'how-it-works') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar {...navProps} showHomeButton={true} />
        <div className="flex-1">
          <HowItWorksPage />
        </div>
        <Footer {...footerProps} />
      </div>
    );
  }

  // ── PLAN DISPLAY (requires auth) ──
  if (currentState === 'plan' && dietPlan && userData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar {...navProps} showHomeButton={true} />
        <div className="flex-1">
          <DietPlanDisplay
            dietPlan={dietPlan}
            userName={userData.name}
            onRestart={handleRestart}
          />
        </div>
        <Footer {...footerProps} />
      </div>
    );
  }

  // ── CONTACT ──
  if (currentState === 'contact') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar {...navProps} showHomeButton={true} />
        <div className="flex-1">
          <ContactPage />
        </div>
        <Footer {...footerProps} />
      </div>
    );
  }

  // ── DISCLAIMER ──
  if (currentState === 'disclaimer') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar {...navProps} showHomeButton={true} />
        <div className="flex-1">
          <DisclaimerPage />
        </div>
        <Footer {...footerProps} />
      </div>
    );
  }

  // ── LANDING PAGE ──
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <Navbar {...navProps} />

      {/* Hero Section */}
      <div className="relative overflow-hidden flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl mb-8">
              <Heart className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Your Personal
              <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent block">
                Nutrition Coach
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get a science-backed, personalized 7-day nutrition plan tailored to your unique health goals,
              dietary preferences, and lifestyle in just 5 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleStartQuestionnaire}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-lg font-semibold rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-xl"
              >
                {user ? 'Start Your Assessment' : 'Get Started — Sign In'}
              </button>

              <div className="flex items-center text-gray-600">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                <span>Free • Takes 5 minutes • Instant results</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 mb-16">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                <span>Dietitian-approved framework</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-500" />
                <span>Science-backed recommendations</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                <span>Personalized for you</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform creates comprehensive nutrition plans that fit your lifestyle and help you achieve your health goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-colors">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Plans</h3>
              <p className="text-gray-600">
                Every plan is tailored to your unique health profile, goals, and preferences using advanced AI analysis.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert-Approved</h3>
              <p className="text-gray-600">
                All recommendations are based on our dietitian-approved framework and current nutrition science.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Package</h3>
              <p className="text-gray-600">
                Get meal plans, supplement recommendations, lifestyle tips, and downloadable PDFs all in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-emerald-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands who have already started their personalized nutrition journey.
          </p>
          <button
            onClick={handleStartQuestionnaire}
            className="px-8 py-4 bg-white text-emerald-600 text-lg font-semibold rounded-2xl hover:bg-gray-50 transition-all hover:scale-105 shadow-xl"
          >
            {user ? 'Get Your Free Plan Now' : 'Sign In & Get Your Free Plan'}
          </button>
        </div>
      </div>

      <Footer {...footerProps} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;