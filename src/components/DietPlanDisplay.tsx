import React, { useState } from 'react';
import { Download, Calendar, Clock, Users, AlertTriangle } from 'lucide-react';
import { DietPlan } from '../types';
import { generatePDF } from '../utils/pdfGenerator';

interface DietPlanDisplayProps {
  dietPlan: DietPlan;
  userName: string;
  onRestart: () => void;
}

export const DietPlanDisplay: React.FC<DietPlanDisplayProps> = ({
  dietPlan,
  userName,
  onRestart
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const pdfBlob = await generatePDF(dietPlan, userName);
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${userName.replace(/\s+/g, '_')}_7_Day_Nutrition_Plan.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Personalized 7-Day Nutrition Plan
        </h1>
        <p className="text-lg text-gray-600">
          Tailored specifically for {userName}
        </p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <Users className="w-4 h-4 mr-2" />
          Framework approved by licensed dietitians
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all hover:scale-105 disabled:opacity-50"
        >
          {isGeneratingPDF ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Download className="w-5 h-5 mr-2" />
          )}
          {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
        </button>

        <button
          onClick={onRestart}
          className="flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-all hover:scale-105"
        >
          Create New Plan
        </button>
      </div>

      {/* Download hint */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500">
          Download your plan as a PDF to save and share it easily.
        </p>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Overview</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">{dietPlan.overview}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-emerald-50 rounded-xl">
            <div className="text-2xl font-bold text-emerald-600">{dietPlan.dailyCalories}</div>
            <div className="text-sm text-gray-600">Daily Calories</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{dietPlan.macroBreakdown.protein}%</div>
            <div className="text-sm text-gray-600">Protein</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">{dietPlan.macroBreakdown.carbs}%</div>
            <div className="text-sm text-gray-600">Carbs</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">{dietPlan.macroBreakdown.fat}%</div>
            <div className="text-sm text-gray-600">Fat</div>
          </div>
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">7-Day Meal Plan</h2>
        <div className="space-y-8">
          {dietPlan.weeklyPlan.map((day) => (
            <div key={day.day} className="border-l-4 border-emerald-500 pl-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{day.dayName}</h3>
                <span className="text-emerald-600 font-semibold">{day.totalCalories} calories</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {day.meals.map((meal, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="font-semibold text-sm uppercase text-gray-700">
                        {meal.type}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{meal.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{meal.calories} calories</p>
                    <p className="text-xs text-gray-500">Prep: {meal.prepTime}</p>
                  </div>
                ))}
              </div>

              {day.notes && (
                <p className="text-gray-600 italic">{day.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Supplements */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Supplements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dietPlan.supplements.map((supplement, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-orange-600 mb-2">{supplement.name}</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Dosage:</span> {supplement.dosage}</p>
                <p><span className="font-semibold">Timing:</span> {supplement.timing}</p>
                <p><span className="font-semibold">Purpose:</span> {supplement.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lifestyle Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lifestyle Recommendations</h2>
        <div className="space-y-4">
          {dietPlan.lifestyleRecommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                {index + 1}
              </div>
              <p className="text-gray-700 leading-relaxed">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-800 mb-2">Important Medical Disclaimer</h3>
            <p className="text-red-700 leading-relaxed">{dietPlan.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};