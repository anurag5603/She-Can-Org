export interface QuestionnaireData {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goals: string[];
  dietaryRestrictions: string[];
  healthConcerns: string[];
  currentSymptoms: string[];
  mealPreferences: string[];
  supplementsCurrently: string;
  name: string;
}

export interface DietPlan {
  overview: string;
  dailyCalories: number;
  macroBreakdown: {
    protein: number;
    carbs: number;
    fat: number;
  };
  weeklyPlan: DayPlan[];
  supplements: Supplement[];
  lifestyleRecommendations: string[];
  disclaimer: string;
}

export interface DayPlan {
  day: number;
  dayName: string;
  meals: Meal[];
  totalCalories: number;
  notes: string;
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  ingredients: string[];
  calories: number;
  prepTime: string;
  instructions: string;
}

export interface Supplement {
  name: string;
  dosage: string;
  timing: string;
  purpose: string;
}