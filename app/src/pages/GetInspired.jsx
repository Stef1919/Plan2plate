
import { useState } from 'react';
import { motion } from 'framer-motion';
import { meals } from '../data/meals';
import { MealCard } from '../components/MealCard';
import { SparklesIcon, FilterIcon } from 'lucide-react';

const filters = ['All', 'Easy to Make', 'Quick (< 30m)', 'High Protein', 'Budget-Friendly'];

export function GetInspired() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [randomSeed, setRandomSeed] = useState(0);

  let filteredMeals = meals;
  if (activeFilter === 'Easy to Make') filteredMeals = meals.filter((m) => m.difficulty === 'easy');
  if (activeFilter === 'Quick (< 30m)') filteredMeals = meals.filter((m) => m.prepTime + m.cookTime < 30);
  if (activeFilter === 'High Protein') filteredMeals = meals.filter((m) => m.tags.includes('high-protein'));
  if (activeFilter === 'Budget-Friendly') filteredMeals = meals.filter((m) => m.tags.includes('budget-friendly'));
  const displayMeals = [...filteredMeals].sort(() => 0.5 - Math.random()).slice(0, 12);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', paddingBottom: '5rem' }}>
      <div style={{ backgroundColor: '#1a1a2e', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ position: 'relative', zIndex: 10 }}>
          <SparklesIcon style={{ width: 64, height: 64, color: '#e4002b', margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>What are you craving?</h1>
          <p style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '2rem', maxWidth: 672, margin: '0 auto 2rem' }}>Discover new recipes tailored to your taste. Add them directly to your weekly plan.</p>
          <button onClick={() => setRandomSeed((prev) => prev + 1)} style={{ backgroundColor: '#e4002b', color: 'white', padding: '1rem 2rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1.125rem', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}>Surprise Me!</button>
        </motion.div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontWeight: 500, marginRight: '1rem' }}>
          <FilterIcon style={{ width: 20, height: 20 }} /> Filters:
        </div>
        {filters.map((filter) =>
        <button key={filter} onClick={() => setActiveFilter(filter)} style={{ padding: '0.5rem 1.25rem', borderRadius: '9999px', fontWeight: 500, whiteSpace: 'nowrap', border: activeFilter === filter ? '1px solid #e4002b' : '1px solid #e5e5e5', backgroundColor: activeFilter === filter ? '#e4002b' : 'white', color: activeFilter === filter ? 'white' : '#4b5563', cursor: 'pointer' }}>
            {filter}
          </button>
        )}
      </div>

      <motion.div key={randomSeed + activeFilter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {displayMeals.map((meal) => <div key={meal.id} style={{ height: '100%' }}><MealCard meal={meal} onAdd={() => alert('Meal added to plan! (Mock)')} showNutrition={true} /></div>)}
      </motion.div>
    </div>);

}