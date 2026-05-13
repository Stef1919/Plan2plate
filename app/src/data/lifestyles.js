
export const lifestyles = [
{
  id: 'normal',
  name: 'Normal Life',
  emoji: '🍽️',
  description: 'Balanced eating, no special goals',
  color: '#3b82f6'
},
{
  id: 'sport',
  name: 'Sport Life',
  emoji: '💪',
  description: 'High protein, performance focus',
  color: '#8b5cf6'
},
{
  id: 'diet',
  name: 'Diet',
  emoji: '🥗',
  description: 'Calorie-conscious, lighter portions',
  color: '#10b981'
},
{
  id: 'vegetarian',
  name: 'Vegetarian',
  emoji: '🌱',
  description: 'Plant-forward meals',
  color: '#22c55e'
},
{
  id: 'highprotein',
  name: 'High Protein',
  emoji: '🥩',
  description: 'Muscle building focus',
  color: '#ef4444'
}];


// Nutrition multipliers applied per lifestyle. These adjust the displayed
// calories / protein / carbs on each meal so the plan reflects the user's goals.
export const lifestyleNutrition = {
  normal: { calorieMult: 1.0, proteinMult: 1.0, carbsMult: 1.0, targetCalories: 2000, focus: 'Balanced' },
  sport: { calorieMult: 1.25, proteinMult: 1.4, carbsMult: 1.15, targetCalories: 2600, focus: 'Performance' },
  diet: { calorieMult: 0.8, proteinMult: 1.0, carbsMult: 0.7, targetCalories: 1600, focus: 'Light' },
  vegetarian: { calorieMult: 1.0, proteinMult: 0.9, carbsMult: 1.1, targetCalories: 2000, focus: 'Plant-based' },
  highprotein: { calorieMult: 1.1, proteinMult: 1.6, carbsMult: 0.85, targetCalories: 2300, focus: 'Muscle' }
};

export function getAdjustedNutrition(meal, lifestyleId = 'normal') {
  const mult = lifestyleNutrition[lifestyleId] || lifestyleNutrition.normal;
  return {
    calories: Math.round((meal.calories || 0) * mult.calorieMult),
    protein: Math.round((meal.protein || 0) * mult.proteinMult),
    carbs: Math.round((meal.carbs || 0) * mult.carbsMult)
  };
}