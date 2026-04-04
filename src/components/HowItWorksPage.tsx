import React from 'react';
import { FileText, Brain, Download, CheckCircle, Clock, Users, Shield } from 'lucide-react';

// Bug fix #2: Accept onStartAssessment so the CTA button actually navigates
interface HowItWorksPageProps {
  onStartAssessment?: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onStartAssessment }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-8">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How NutriPlan AI
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block">
              Creates Your Perfect Plan
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Our simple 4-step process combines cutting-edge AI technology with expert nutrition science to deliver personalized meal plans in minutes.
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    1
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Complete Your Health Assessment</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Answer our comprehensive 8-step questionnaire about your health, goals, preferences, and lifestyle. Our smart form adapts to your responses to gather the most relevant information.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span>Basic demographics and measurements</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span>Health goals and current concerns</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span>Dietary restrictions and preferences</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span>Activity level and lifestyle factors</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Takes only 5 minutes to complete</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <FileText className="w-12 h-12 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Questionnaire</h3>
                  <p className="text-gray-600 mb-4">Our adaptive assessment gathers 50+ data points about your health and lifestyle.</p>
                  <div className="space-y-2">
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-emerald-600">Step 3 of 8</span>
                      </div>
                      <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Brain className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Analysis Engine</h3>
                  <p className="text-gray-600 mb-4">Advanced algorithms process your data using nutrition science and dietitian expertise.</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">Calorie calculation</span>
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">Macro optimization</span>
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">Meal selection</span>
                      <div className="w-4 h-4 border-2 border-blue-300 rounded-full animate-spin"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    2
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">AI Processes Your Data</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Our advanced AI engine analyzes your responses using our dietitian-approved framework. It calculates your optimal calorie needs, macro ratios, and selects meals that match your preferences and restrictions.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Calculates personalized calorie targets</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Optimizes protein, carb, and fat ratios</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Selects meals based on your preferences</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Recommends targeted supplements</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <Brain className="w-4 h-4 mr-2" />
                  <span>Powered by Llama 3 and nutrition science</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    3
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Receive Your Custom Plan</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Get your complete 7-day nutrition plan with detailed meal plans, supplement recommendations, and lifestyle tips. Everything is organized and easy to follow.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                    <span>7 days of complete meal plans</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                    <span>Detailed ingredient lists and instructions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                    <span>Personalized supplement recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                    <span>Lifestyle and wellness tips</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Reviewed by licensed dietitians</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Your Nutrition Plan</h3>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-sm">Daily Calories: 1,800</div>
                      <div className="text-xs text-gray-600">Protein 30% | Carbs 40% | Fat 30%</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-sm">Day 1 - Monday</div>
                      <div className="text-xs text-gray-600">4 meals planned</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-sm">Supplements</div>
                      <div className="text-xs text-gray-600">3 recommendations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Download className="w-12 h-12 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Download & Share</h3>
                  <p className="text-gray-600 mb-4">Get your plan in multiple formats for easy access and sharing.</p>
                  <div className="space-y-3">
                    <button className="w-full p-3 bg-orange-50 rounded-lg text-left hover:bg-orange-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Download PDF</span>
                        <Download className="w-4 h-4 text-orange-600" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    4
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Download & Start Your Journey</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Download your plan as a professional PDF or have it emailed to you. Start implementing your personalized nutrition strategy immediately with clear, actionable guidance.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                    <span>Professional PDF format</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                    <span>Print-friendly design</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                    <span>Easy sharing with healthcare providers</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Includes medical disclaimers and safety information</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Technology Behind Your Plan</h2>
            <p className="text-xl text-gray-600">Advanced AI meets expert nutrition science</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Llama 3 AI Engine</h3>
              <p className="text-gray-600">
                Powered by Meta's Llama 3 70B via Groq, a state-of-the-art language model trained on vast amounts of nutrition and health data to provide intelligent, contextual recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dietitian Framework</h3>
              <p className="text-gray-600">
                Our AI operates within a framework developed and approved by licensed dietitians, ensuring all recommendations follow evidence-based nutrition principles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Safety First</h3>
              <p className="text-gray-600">
                Built-in safety protocols and medical disclaimers ensure responsible recommendations. Always encourages consultation with healthcare providers when appropriate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our process</p>
          </div>

          <div className="space-y-8">
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How accurate are the AI-generated plans?</h3>
              <p className="text-gray-600">
                Our AI operates within a framework developed by licensed dietitians and follows evidence-based nutrition principles. While highly accurate for general guidance, we always recommend consulting with a healthcare provider for personalized medical advice.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can I modify the plan after it's generated?</h3>
              <p className="text-gray-600">
                The current version provides a complete 7-day plan based on your assessment. If you need modifications, you can retake the assessment with updated preferences to generate a new plan.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Is this suitable for people with medical conditions?</h3>
              <p className="text-gray-600">
                Our plans include considerations for common health concerns, but they are not medical advice. Anyone with medical conditions should consult their healthcare provider before making significant dietary changes.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How long does the process take?</h3>
              <p className="text-gray-600">
                The assessment takes about 5 minutes to complete, and your personalized plan is generated instantly. You can download or email your plan immediately after completion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section — Bug fix #2: onClick now wired up */}
      <div className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience our simple 4-step process and get your personalized nutrition plan in minutes.
          </p>
          <button
            onClick={onStartAssessment}
            className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-2xl hover:bg-gray-50 transition-all hover:scale-105 shadow-xl"
          >
            Start Your Assessment Now
          </button>
        </div>
      </div>
    </div>
  );
};