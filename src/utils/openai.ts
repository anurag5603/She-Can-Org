import { QuestionnaireData, DietPlan } from '../types';
import API_BASE from '../config';

export async function generateDietPlan(data: QuestionnaireData): Promise<DietPlan> {
  const prompt = `
    Create a comprehensive 7-day personalized nutrition plan based on the following user profile:

    Demographics:
    - Age: ${data.age}
    - Gender: ${data.gender}
    - Weight: ${data.weight} lbs
    - Height: ${data.height} inches
    - Activity Level: ${data.activityLevel}

    Goals: ${data.goals.join(', ')}
    Dietary Restrictions: ${data.dietaryRestrictions.join(', ') || 'None'}
    Health Concerns: ${data.healthConcerns.join(', ') || 'None'}
    Current Symptoms: ${data.currentSymptoms.join(', ') || 'None'}
    Meal Preferences: ${data.mealPreferences.join(', ')}
    Current Supplements: ${data.supplementsCurrently || 'None'}

    Please create a detailed response in the following JSON format:
    {
      "overview": "Brief personalized overview of the plan approach",
      "dailyCalories": calculated_daily_calories_number,
      "macroBreakdown": {
        "protein": percentage_number,
        "carbs": percentage_number,
        "fat": percentage_number
      },
      "weeklyPlan": [
        {
          "day": 1,
          "dayName": "Monday",
          "meals": [
            {
              "type": "breakfast",
              "name": "Meal name",
              "ingredients": ["ingredient1", "ingredient2"],
              "calories": calorie_number,
              "prepTime": "time",
              "instructions": "Simple preparation steps"
            }
          ],
          "totalCalories": daily_total_number,
          "notes": "Any special notes for this day"
        }
      ],
      "supplements": [
        {
          "name": "Supplement name",
          "dosage": "Amount and form",
          "timing": "When to take",
          "purpose": "Why it's recommended"
        }
      ],
      "lifestyleRecommendations": [
        "Lifestyle tip 1",
        "Lifestyle tip 2"
      ],
      "disclaimer": "Standard medical disclaimer"
    }

    Requirements:
    - Include 3 main meals and 1-2 snacks per day
    - Calculate appropriate calories based on age, weight, height, and activity level
    - Address specific health concerns and symptoms mentioned
    - Consider dietary restrictions and preferences
    - Include 3-5 targeted supplement recommendations
    - Provide 5-7 lifestyle recommendations
    - Make meals practical and achievable
    - Include proper medical disclaimers
    - Return ONLY the JSON object, no extra text or markdown
  `;

  let response: Response;

  try {
    response = await fetch(`${API_BASE}/api/generate-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert nutritionist and dietitian. Create detailed, personalized nutrition plans that are safe, evidence-based, and practical. Always include proper medical disclaimers. Return ONLY valid JSON with no extra text or markdown formatting.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });
  } catch (fetchError: any) {
    throw new Error('Network error: ' + fetchError.message);
  }

  if (!response.ok) {
    const errorData = await response.json();
    console.error('API error:', errorData);
    throw new Error('API error: ' + JSON.stringify(errorData));
  }

  const result = await response.json();
  const content = result.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No response from API');
  }

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  const jsonString = jsonMatch ? jsonMatch[0] : content;

  try {
    return JSON.parse(jsonString);
  } catch (parseError: any) {
    console.error('JSON parse error. Content was:', content);
    throw new Error('Failed to parse response as JSON: ' + parseError.message);
  }
}