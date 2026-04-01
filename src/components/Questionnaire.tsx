import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { MultiSelect } from './MultiSelect';
import { SingleSelect } from './SingleSelect';
import { ProgressBar } from './ProgressBar';
import { QuestionnaireData } from '../types';

interface QuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
  isLoading: boolean;
}

type UnitSystem = 'imperial' | 'metric';

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial');

  const [metricWeight, setMetricWeight] = useState<number | ''>('');
  const [metricHeightCm, setMetricHeightCm] = useState<number | ''>('');

  const [formData, setFormData] = useState<Partial<QuestionnaireData>>({
    goals: [],
    dietaryRestrictions: [],
    healthConcerns: [],
    currentSymptoms: [],
    mealPreferences: []
  });

  const totalSteps = 8;

  const updateFormData = (field: keyof QuestionnaireData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMetricWeight = (kg: number | '') => {
    setMetricWeight(kg);
    if (kg !== '' && kg > 0) {
      updateFormData('weight', Math.round((kg as number) * 2.20462));
    } else {
      updateFormData('weight', undefined);
    }
  };

  const handleMetricHeight = (cm: number | '') => {
    setMetricHeightCm(cm);
    if (cm !== '' && cm > 0) {
      updateFormData('height', Math.round((cm as number) / 2.54));
    } else {
      updateFormData('height', undefined);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData as QuestionnaireData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 1: return !!(formData.age && formData.age >= 16 && formData.gender);
      case 2: return !!(formData.weight && formData.weight > 0 && formData.height && formData.height > 0);
      case 3: return !!formData.activityLevel;
      case 4: return !!(formData.goals && formData.goals.length > 0);
      case 5: return true;
      case 6: return true;
      case 7: return !!(formData.mealPreferences && formData.mealPreferences.length > 0);
      case 8: return !!(formData.name && formData.name.trim().length > 0);
      default: return false;
    }
  };

  const imperialHeightHint = () => {
    if (!formData.height) return null;
    const ft = Math.floor(formData.height / 12);
    const inches = formData.height % 12;
    return `${ft}′ ${inches}″`;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            title="Let's start with some basic information"
            subtitle="This helps us understand your unique needs"
            onNext={handleNext}
            canGoNext={canGoNext()}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What's your age?
                </label>
                <input
                  type="number"
                  min="16"
                  max="100"
                  value={formData.age || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) updateFormData('age', val);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Gender</label>
                <SingleSelect
                  options={[
                    { value: 'female', label: 'Female' },
                    { value: 'male', label: 'Male' },
                    { value: 'other', label: 'Other/Prefer not to say' }
                  ]}
                  selected={formData.gender || ''}
                  onChange={(value) => updateFormData('gender', value)}
                />
              </div>
            </div>
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard
            title="Help us calculate your nutritional needs"
            subtitle="We'll use this to determine your optimal calorie and macro targets"
            onNext={handleNext}
            onPrev={handlePrev}
            canGoNext={canGoNext()}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => {
                    setUnitSystem('imperial');
                    setMetricWeight('');
                    setMetricHeightCm('');
                    updateFormData('weight', undefined);
                    updateFormData('height', undefined);
                  }}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    unitSystem === 'imperial' ? 'bg-white text-emerald-700 shadow' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Imperial (lbs / in)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUnitSystem('metric');
                    setMetricWeight('');
                    setMetricHeightCm('');
                    updateFormData('weight', undefined);
                    updateFormData('height', undefined);
                  }}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    unitSystem === 'metric' ? 'bg-white text-emerald-700 shadow' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Metric (kg / cm)
                </button>
              </div>

              {unitSystem === 'imperial' ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Current weight (lbs)</label>
                    <input
                      type="number" min="80" max="500"
                      value={formData.weight || ''}
                      onChange={(e) => { const val = parseInt(e.target.value); if (!isNaN(val)) updateFormData('weight', val); }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                      placeholder="e.g. 160"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Height (inches)</label>
                    <input
                      type="number" min="48" max="96"
                      value={formData.height || ''}
                      onChange={(e) => { const val = parseInt(e.target.value); if (!isNaN(val)) updateFormData('height', val); }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                      placeholder="e.g. 68"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Reference: 5′0″ = 60 in · 5′6″ = 66 in · 6′0″ = 72 in
                      {formData.height ? <span className="ml-2 text-emerald-600 font-semibold">= {imperialHeightHint()}</span> : null}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Current weight (kg)</label>
                    <input
                      type="number" min="30" max="250"
                      value={metricWeight}
                      onChange={(e) => handleMetricWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                      placeholder="e.g. 70"
                    />
                    {metricWeight !== '' && formData.weight && (
                      <p className="text-sm text-emerald-600 mt-2 font-medium">≈ {formData.weight} lbs</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Height (cm)</label>
                    <input
                      type="number" min="120" max="250"
                      value={metricHeightCm}
                      onChange={(e) => handleMetricHeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                      placeholder="e.g. 170"
                    />
                    {metricHeightCm !== '' && formData.height && (
                      <p className="text-sm text-emerald-600 mt-2 font-medium">≈ {imperialHeightHint()}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard
            title="What's your activity level?"
            subtitle="This helps us adjust your calorie needs accurately"
            onNext={handleNext}
            onPrev={handlePrev}
            canGoNext={canGoNext()}
          >
            <SingleSelect
              options={[
                { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise, desk job' },
                { value: 'light', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
                { value: 'moderate', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
                { value: 'active', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
                { value: 'very_active', label: 'Extremely Active', description: 'Very hard exercise, physical job, or training' }
              ]}
              selected={formData.activityLevel || ''}
              onChange={(value) => updateFormData('activityLevel', value)}
            />
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard
            title="What are your primary health goals?"
            subtitle="Select all that apply - we'll tailor your plan accordingly"
            onNext={handleNext}
            onPrev={handlePrev}
            canGoNext={canGoNext()}
          >
            <MultiSelect
              options={[
                'Weight loss', 'Weight gain', 'Muscle building', 'Improved energy',
                'Better sleep', 'Digestive health', 'Heart health',
                'Blood sugar management', 'Reduce inflammation', 'General wellness'
              ]}
              selected={formData.goals || []}
              onChange={(selected) => updateFormData('goals', selected)}
            />
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard
            title="Any dietary restrictions or preferences?"
            subtitle="We'll make sure your plan works with your lifestyle"
            onNext={handleNext}
            onPrev={handlePrev}
            canGoNext={canGoNext()}
          >
            <MultiSelect
              options={[
                'Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free',
                'Keto/Low-carb', 'Paleo', 'Mediterranean',
                'Nut allergies', 'Shellfish allergies', 'No restrictions'
              ]}
              selected={formData.dietaryRestrictions || []}
              onChange={(selected) => updateFormData('dietaryRestrictions', selected)}
            />
          </QuestionCard>
        );

      case 6:
        return (
          <QuestionCard
            title="Tell us about your health"
            subtitle="This helps us provide more targeted nutrition advice — select all that apply"
            onNext={handleNext}
            onPrev={handlePrev}
            canGoNext={canGoNext()}
          >
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Existing health conditions
                </p>
                <MultiSelect
                  options={[
                    'High blood pressure',
                    'High cholesterol',
                    'Diabetes/pre-diabetes',
                    'Thyroid issues',
                    'Heart disease',
                    'Kidney disease',
                    'Celiac disease',
                    'IBS / IBD',
                    'None of the above'
                  ]}
                  selected={formData.healthConcerns || []}
                  onChange={(selected) => updateFormData('healthConcerns', selected)}
                />
              </div>

              <div className="border-t border-gray-100" />

              <div>
                <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Current symptoms
                </p>
                <MultiSelect
                  options={[
                    'Low energy/fatigue',
                    'Digestive issues',
                    'Joint pain/inflammation',
                    'Sleep problems',
                    'Stress/anxiety',
                    'Skin issues',
                    'Frequent colds',
                    'None of the above'
                  ]}
                  selected={formData.currentSymptoms || []}
                  onChange={(selected) => updateFormData('currentSymptoms', selected)}
                />
              </div>
            </div>
          </QuestionCard>
        );

      case 7:
        return (
          <QuestionCard
            title="What types of meals do you prefer?"
            subtitle="We'll focus on foods you'll actually enjoy eating"
            onNext={handleNext}
            onPrev={handlePrev}
            canGoNext={canGoNext()}
          >
            <MultiSelect
              options={[
                'Quick & simple meals (under 30 min)', 'Batch cooking/meal prep',
                'Fresh, whole foods', 'Smoothies & shakes',
                'Comfort foods (healthier versions)', 'International cuisines',
                'Snack-focused eating', 'Traditional breakfast/lunch/dinner'
              ]}
              selected={formData.mealPreferences || []}
              onChange={(selected) => updateFormData('mealPreferences', selected)}
            />
          </QuestionCard>
        );

      case 8:
        return (
          <QuestionCard
            title="Almost done! What's your name?"
            subtitle="We'll use this to personalize your nutrition plan"
            onNext={handleNext}
            onPrev={handlePrev}
            canGoNext={canGoNext()}
            isLast={true}
            isLoading={isLoading}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Your name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                  placeholder="Enter your name"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Current supplements (optional)
                </label>
                <textarea
                  value={formData.supplementsCurrently || ''}
                  onChange={(e) => updateFormData('supplementsCurrently', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg h-24"
                  placeholder="List any vitamins, minerals, or supplements you're currently taking..."
                />
              </div>
            </div>
          </QuestionCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-8 px-4 min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        {renderStep()}
      </div>
    </div>
  );
};