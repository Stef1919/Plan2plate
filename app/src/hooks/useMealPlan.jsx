import { createContext, useContext, useState, useEffect } from 'react';
import { meals } from '../data/meals';

const MealPlanContext = createContext();

export function MealPlanProvider({ children }) {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [planDuration, setPlanDuration] = useState(7);
  const [shoppingList, setShoppingList] = useState([]);
  const [cart, setCart] = useState([]);
  const [mealHistory, setMealHistory] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    activeLifestyle: false,
    calorieGoal: 2000,
    showNutrition: false
  });

  // Generate a random plan based on duration
  const generatePlan = (duration = planDuration) => {
    const breakfasts = meals.filter((m) => m.category === 'breakfast');
    const lunches = meals.filter((m) => m.category === 'lunch');
    const dinners = meals.filter((m) => m.category === 'dinner');

    const newPlan = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration,
      days: Array.from({ length: duration }).map((_, i) => ({
        dayIndex: i,
        breakfast: breakfasts[Math.floor(Math.random() * breakfasts.length)],
        lunch: lunches[Math.floor(Math.random() * lunches.length)],
        dinner: dinners[Math.floor(Math.random() * dinners.length)]
      }))
    };

    setCurrentPlan(newPlan);
    setPlanDuration(duration);
    generateShoppingList(newPlan);
    // Add to history automatically
    setMealHistory((prev) => [newPlan, ...prev]);
  };

  // Replace a single meal in the plan
  const replaceMeal = (dayIndex, mealType, newMeal) => {
    if (!currentPlan) return;

    const updatedDays = [...currentPlan.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      [mealType]: newMeal
    };

    const updatedPlan = { ...currentPlan, days: updatedDays };
    setCurrentPlan(updatedPlan);
    generateShoppingList(updatedPlan);
  };

  // Auto-generate shopping list merging duplicates
  const generateShoppingList = (plan) => {
    if (!plan) return;

    const ingredientsMap = new Map();

    plan.days.forEach((day) => {
      ['breakfast', 'lunch', 'dinner'].forEach((mealType) => {
        const meal = day[mealType];
        if (meal && meal.ingredients) {
          meal.ingredients.forEach((ing) => {
            const key = `${ing.name}-${ing.unit}`;
            if (ingredientsMap.has(key)) {
              const existing = ingredientsMap.get(key);
              ingredientsMap.set(key, {
                ...existing,
                amount: existing.amount + ing.amount
              });
            } else {
              ingredientsMap.set(key, { ...ing, id: Math.random().toString(36).substr(2, 9) });
            }
          });
        }
      });
    });

    setShoppingList(Array.from(ingredientsMap.values()));
  };

  const removeFromShoppingList = (id) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const addAllToCart = () => {
    setCart((prev) => [...prev, ...shoppingList]);
    setShoppingList([]);
  };

  const clearCart = () => setCart([]);

  const clearShoppingList = () => setShoppingList([]);

  // Save current plan to savedPlans
  const savePlan = () => {
    if (currentPlan) {
      // Avoid duplicates
      setSavedPlans((prev) => {
        if (prev.some((p) => p.id === currentPlan.id)) return prev;
        return [currentPlan, ...prev];
      });
    }
  };

  // Delete a saved plan
  const deleteSavedPlan = (id) => {
    setSavedPlans((prev) => prev.filter((p) => p.id !== id));
  };

  // Delete from history
  const deleteFromHistory = (id) => {
    setMealHistory((prev) => prev.filter((p) => p.id !== id));
  };

  const reusePlan = (plan) => {
    setCurrentPlan({ ...plan, id: Date.now().toString(), date: new Date().toISOString() });
    setPlanDuration(plan.duration);
    generateShoppingList(plan);
  };

  const togglePreference = (key) => {
    setUserPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <MealPlanContext.Provider value={{
      currentPlan,
      planDuration,
      setPlanDuration,
      shoppingList,
      cart,
      mealHistory,
      savedPlans,
      userPreferences,
      generatePlan,
      replaceMeal,
      savePlan,
      deleteSavedPlan,
      deleteFromHistory,
      removeFromShoppingList,
      clearShoppingList,
      generateShoppingList,
      addAllToCart,
      clearCart,
      reusePlan,
      togglePreference
    }}>
      {children}
    </MealPlanContext.Provider>);

}

export function useMealPlan() {
  return useContext(MealPlanContext);
}