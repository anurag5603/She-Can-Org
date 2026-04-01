import React from 'react';
import { Shield, AlertTriangle, Heart, Users, FileText, CheckCircle, Info } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl mb-8 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Medical
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent block">
              Disclaimer
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Please read this important information carefully before using NutriPlan AI's services.
            Your health and safety are our top priority.
          </p>

          <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            <Info className="w-4 h-4 mr-2" />
            Last updated: March 2026
          </div>
        </div>
      </div>

      {/* Disclaimer Content */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Important Notice Banner */}
          <div className="mb-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl">
            <div className="flex items-start">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-red-900 mb-2">Important Notice</h2>
                <p className="text-red-800 leading-relaxed">
                  NutriPlan AI is designed for <strong>informational and educational purposes only</strong>. 
                  It is not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of your physician or other qualified healthcare provider with 
                  any questions you may have regarding a medical condition or dietary changes.
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-10">

            {/* Section 1 */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Nature of the Service</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed pl-14">
                <p>
                  NutriPlan AI uses artificial intelligence technology to generate personalized nutrition 
                  recommendations based on user-provided information. The service is intended to provide 
                  general nutrition guidance and meal planning assistance.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Our AI generates plans based on the data you provide during the assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Plans are algorithmically generated and not individually reviewed by a dietitian</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>The framework behind our recommendations has been reviewed by licensed dietitians</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. Not Medical Advice</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed pl-14">
                <p>
                  The content provided by NutriPlan AI does not constitute medical advice and should 
                  not be relied upon as such. Specifically:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Our service <strong>does not</strong> diagnose, treat, cure, or prevent any disease or medical condition</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Nutrition plans are <strong>not</strong> intended to replace professional dietary counseling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Supplement recommendations are for informational purposes and should be discussed with your doctor</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Individual results may vary and are not guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                  <Heart className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. When to Consult a Healthcare Provider</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed pl-14">
                <p>
                  You should consult with a qualified healthcare professional before making any 
                  significant changes to your diet, especially if you:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Have a chronic medical condition',
                    'Are pregnant or breastfeeding',
                    'Take prescription medications',
                    'Have a history of eating disorders',
                    'Have food allergies or intolerances',
                    'Are under 18 years of age',
                    'Have recently had surgery',
                    'Have diabetes or blood sugar issues',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-amber-50 rounded-xl">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Our Commitment to Safety</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed pl-14">
                <p>
                  While NutriPlan AI strives to provide accurate and helpful nutrition information, 
                  we want you to understand our approach to safety:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Our AI framework has been developed in consultation with licensed dietitians</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>We follow evidence-based nutrition principles in our recommendation system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>We continuously update our system based on the latest nutrition research</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>We encourage transparency and always recommend professional consultation when appropriate</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed pl-14">
                <p>
                  By using NutriPlan AI, you acknowledge and agree that:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>You use the service and its recommendations at your own risk</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>NutriPlan AI shall not be liable for any adverse health effects resulting from following generated plans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>The accuracy of recommendations depends on the accuracy of information you provide</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>You are responsible for verifying all recommendations with a qualified professional</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                  <Info className="w-5 h-5 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">6. Data & Privacy</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed pl-14">
                <p>
                  Information you provide during the health assessment is used solely to generate 
                  your personalized nutrition plan. We take your privacy seriously:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Your health data is processed in real-time and not permanently stored on our servers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>We do not share your personal health information with third parties</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Generated plans are available for your download and are not retained after your session</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="mt-12 p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 text-center">
            <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Your Health Matters Most</h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              By using NutriPlan AI, you acknowledge that you have read and understood this medical disclaimer. 
              We encourage all users to work alongside healthcare professionals to ensure the best outcomes 
              for their health and wellness journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
