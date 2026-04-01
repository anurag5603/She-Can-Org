import React from 'react';
import { Heart, Brain, Shield, Download, Mail, Clock, Users, Sparkles, CheckCircle, Target, Utensils, Activity } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl mb-8">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent block">
              Your Health Journey
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover how our AI-powered platform creates personalized nutrition plans that adapt to your unique needs and lifestyle.
          </p>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="flex items-center mb-6">
                <Brain className="w-8 h-8 text-emerald-500 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">AI-Powered Personalization</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Our advanced AI analyzes your health profile, goals, and preferences to create a nutrition plan that's uniquely yours. No generic templates - every recommendation is tailored specifically for you.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Considers 50+ health and lifestyle factors</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Adapts to dietary restrictions and allergies</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Accounts for activity level and metabolism</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl p-8 text-center">
              <Brain className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Analysis</h3>
              <p className="text-gray-600">Advanced algorithms process your data to create optimal nutrition strategies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Approved</h3>
              <p className="text-gray-600">All recommendations backed by licensed dietitians and nutrition science</p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-blue-500 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Science-Backed Recommendations</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Every suggestion is grounded in current nutrition science and reviewed by our team of licensed dietitians. You can trust that your plan follows evidence-based practices.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  <span>Dietitian-approved framework</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  <span>Based on latest nutrition research</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  <span>Includes medical disclaimers and safety guidelines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Nutrition Solution</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed in one comprehensive package</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Utensils className="w-12 h-12 text-emerald-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">7-Day Meal Plans</h3>
              <p className="text-gray-600 mb-4">
                Complete weekly meal plans with breakfast, lunch, dinner, and snacks. Each meal includes ingredients, prep time, and instructions.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Detailed ingredient lists</li>
                <li>• Preparation instructions</li>
                <li>• Calorie and macro breakdowns</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Target className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Supplement Guidance</h3>
              <p className="text-gray-600 mb-4">
                Personalized supplement recommendations based on your health goals, dietary gaps, and current symptoms.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Targeted supplement suggestions</li>
                <li>• Optimal dosage recommendations</li>
                <li>• Timing and interaction guidance</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Activity className="w-12 h-12 text-purple-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lifestyle Tips</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive lifestyle recommendations to support your nutrition goals and overall health improvement.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Sleep optimization strategies</li>
                <li>• Stress management techniques</li>
                <li>• Exercise recommendations</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Download className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">PDF Export</h3>
              <p className="text-gray-600 mb-4">
                Download your complete nutrition plan as a professionally formatted PDF for easy reference and printing.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Professional formatting</li>
                <li>• Print-friendly design</li>
                <li>• Includes all plan details</li>
              </ul>
            </div>


            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="w-12 h-12 text-green-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Assessment</h3>
              <p className="text-gray-600 mb-4">
                Complete your health assessment in just 5 minutes and get your personalized plan instantly.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• 8-step guided questionnaire</li>
                <li>• Instant plan generation</li>
                <li>• No waiting periods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose NutriPlan AI?</h2>
            <p className="text-xl text-gray-600">The advantages that set us apart from generic nutrition advice</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Truly Personalized</h3>
                <p className="text-gray-600">Unlike one-size-fits-all diets, every aspect of your plan is customized to your unique profile and goals.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Results</h3>
                <p className="text-gray-600">Get your complete nutrition plan in minutes, not weeks. No waiting for appointments or consultations.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Evidence-Based</h3>
                <p className="text-gray-600">All recommendations are grounded in current nutrition science and approved by licensed dietitians.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Goal-Oriented</h3>
                <p className="text-gray-600">Every recommendation is designed to help you achieve your specific health and wellness objectives.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Start your personalized nutrition journey today with our comprehensive AI-powered platform.
          </p>
          <button className="px-8 py-4 bg-white text-emerald-600 text-lg font-semibold rounded-2xl hover:bg-gray-50 transition-all hover:scale-105 shadow-xl">
            Start Your Assessment
          </button>
        </div>
      </div>
    </div>
  );
};