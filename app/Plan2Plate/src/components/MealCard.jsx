
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, RefreshCwIcon, PlusIcon, RefrigeratorIcon } from 'lucide-react';
import { NutritionBadge } from './NutritionBadge';
import { discounts } from '../data/discounts';

export function MealCard({
  meal,
  onSwap,
  onAdd,
  showNutrition = false,
  isActiveLifestyle = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [swapHovered, setSwapHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);

  if (!meal) return null;

  // Check if meal has discounted ingredients
  const hasDiscount = meal.ingredients.some((ing) =>
  discounts.some((d) => d.ingredientName === ing.name)
  );

  // Adjust calories if active lifestyle is on (mock 20% increase)
  const displayCalories = isActiveLifestyle ? Math.round(meal.calories * 1.2) : meal.calories;
  const displayProtein = isActiveLifestyle ? Math.round(meal.protein * 1.2) : meal.protein;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1rem',
        boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)',
        border: '1px solid #f3f4f6',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div style={{
          fontSize: '2.25rem',
          backgroundColor: '#faf8f5',
          width: 64,
          height: 64,
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
        }}>
          {meal.image}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {onSwap &&
          <button
            onClick={onSwap}
            onMouseEnter={() => setSwapHovered(true)}
            onMouseLeave={() => setSwapHovered(false)}
            style={{
              padding: '0.5rem',
              color: swapHovered ? '#e8723a' : '#9ca3af',
              backgroundColor: swapHovered ? '#fff7ed' : 'transparent',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              opacity: isHovered ? 1 : 0,
              transition: 'all 0.2s'
            }}
            title="Swap Meal">
            
              <RefreshCwIcon style={{ width: 16, height: 16 }} />
            </button>
          }
          {onAdd &&
          <button
            onClick={onAdd}
            onMouseEnter={() => setAddHovered(true)}
            onMouseLeave={() => setAddHovered(false)}
            style={{
              padding: '0.5rem',
              color: 'white',
              backgroundColor: addHovered ? '#3a5233' : '#4a6741',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            title="Add to Plan">
            
              <PlusIcon style={{ width: 16, height: 16 }} />
            </button>
          }
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontWeight: 700, color: '#1f2937', lineHeight: 1.25, marginBottom: '0.25rem', fontSize: '1.125rem' }}>{meal.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ClockIcon style={{ width: 12, height: 12 }} />
            {meal.prepTime + meal.cookTime}m
          </span>
          <span style={{ textTransform: 'capitalize', padding: '0.125rem 0.5rem', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}>
            {meal.difficulty}
          </span>
        </div>

        {meal.canMealPrep &&
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.75rem',
          fontWeight: 500,
          color: '#4a6741',
          backgroundColor: 'rgba(74, 103, 65, 0.1)',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          marginBottom: '0.5rem'
        }}>
            <RefrigeratorIcon style={{ width: 12, height: 12 }} />
            Preps for {meal.mealPrepDays} days
          </div>
        }

        {hasDiscount &&
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#15803d',
          backgroundColor: '#dcfce7',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          marginBottom: '0.5rem',
          marginLeft: meal.canMealPrep ? '0.5rem' : 0
        }}>
            💰 Deal Inside
          </div>
        }
      </div>

      {showNutrition &&
      <NutritionBadge
        calories={displayCalories}
        protein={displayProtein}
        carbs={meal.carbs} />

      }
    </motion.div>);

}