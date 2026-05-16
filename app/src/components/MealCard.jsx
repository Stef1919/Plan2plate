import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, RefreshCwIcon, PlusIcon, RefrigeratorIcon } from 'lucide-react';
import { NutritionBadge } from './NutritionBadge';
import { discounts } from '../data/discounts';
import { useAuth } from '../hooks/useAuth';
import { getAdjustedNutrition, lifestyles } from '../data/lifestyles';

export function MealCard({ meal, onSwap, onAdd }) {
  const [isHovered, setIsHovered] = useState(false);
  const [swapHovered, setSwapHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  const { user } = useAuth();

  if (!meal) return null;

  const lifestyleId = user?.lifestyle || 'normal';
  const lifestyle = lifestyles.find((l) => l.id === lifestyleId) || lifestyles[0];
  const adjusted = getAdjustedNutrition(meal, lifestyleId);

  const hasDiscount = meal.ingredients.some((ing) =>
  discounts.some((d) => d.ingredientName === ing.name)
  );

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
        border: '1px solid #e5e5e5',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div style={{
          fontSize: '2.25rem',
          backgroundColor: '#f5f5f5',
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
              color: swapHovered ? '#e4002b' : '#9ca3af',
              backgroundColor: swapHovered ? '#fef2f2' : 'transparent',
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
              backgroundColor: addHovered ? '#c50025' : '#e4002b',
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
        <h3 style={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1.25, marginBottom: '0.25rem', fontSize: '1.125rem' }}>{meal.name}</h3>
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
          color: '#e4002b',
          backgroundColor: '#fef2f2',
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

      <NutritionBadge
        calories={adjusted.calories}
        protein={adjusted.protein}
        carbs={adjusted.carbs}
        lifestyle={lifestyle} />
      
    </motion.div>);

}