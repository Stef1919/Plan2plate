
import { motion } from 'framer-motion';
import { discounts } from '../data/discounts';
import { meals } from '../data/meals';
import { MealCard } from '../components/MealCard';
import { TagIcon, TrendingDownIcon } from 'lucide-react';

export function Deals() {
  const mealsWithDeals = meals.filter((meal) => meal.ingredients.some((ing) => discounts.some((d) => d.ingredientName === ing.name))).slice(0, 8);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', paddingBottom: '5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '1rem' }}>
          <TagIcon style={{ width: 32, height: 32, color: '#e4002b' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.25rem' }}>Mercator Weekly Deals</h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>Valid until March 19, 2026</p>
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingDownIcon style={{ width: 24, height: 24, color: '#e4002b' }} /> Top Ingredient Discounts
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {discounts.map((discount, i) => {
            const savings = discount.originalPrice - discount.discountedPrice;
            const percentOff = Math.round(savings / discount.originalPrice * 100);
            return (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} key={discount.ingredientName} style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '1rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#e4002b', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderBottomLeftRadius: '0.5rem' }}>-{percentOff}%</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1a1a1a', marginBottom: '1rem', paddingRight: '2rem' }}>{discount.ingredientName}</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.875rem', fontWeight: 700, color: '#16a34a' }}>€{discount.discountedPrice}</span>
                  <span style={{ fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'line-through', marginBottom: '0.25rem' }}>€{discount.originalPrice}</span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem', marginLeft: 'auto' }}>/{discount.unit}</span>
                </div>
              </motion.div>);

          })}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem' }}>Meals to make with these deals</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {mealsWithDeals.map((meal) => <div key={meal.id} style={{ height: '100%' }}><MealCard meal={meal} onAdd={() => alert('Meal added to plan! (Mock)')} /></div>)}
        </div>
      </div>
    </div>);

}