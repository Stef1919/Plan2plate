
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMealPlan } from '../hooks/useMealPlan';
import { MealCard } from '../components/MealCard';
import { meals } from '../data/meals';
import { SaveIcon, XIcon, CalendarDaysIcon, ShoppingCartIcon } from 'lucide-react';

export function MealPlanner() {
  const navigate = useNavigate();
  const { currentPlan, planDuration, generatePlan, replaceMeal, savePlan } = useMealPlan();
  const [swapModal, setSwapModal] = useState({ isOpen: false, dayIndex: null, mealType: null });
  const [isSaving, setIsSaving] = useState(false);
  const [genHovered, setGenHovered] = useState(false);
  const [saveHovered, setSaveHovered] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);

  const handleSwapClick = (dayIndex, mealType) => setSwapModal({ isOpen: true, dayIndex, mealType });
  const handleSelectSwap = (newMeal) => {replaceMeal(swapModal.dayIndex, swapModal.mealType, newMeal);setSwapModal({ isOpen: false, dayIndex: null, mealType: null });};
  const handleSave = () => {setIsSaving(true);savePlan();setTimeout(() => setIsSaving(false), 1000);};
  const swapOptions = swapModal.isOpen ? meals.filter((m) => m.category === swapModal.mealType).sort(() => 0.5 - Math.random()).slice(0, 4) : [];

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', paddingBottom: '5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>Meal Planner</h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>Customize your week and generate your shopping list.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '0.75rem', padding: '0.25rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5' }}>
            {[3, 5, 7].map((days) =>
            <button key={days} onClick={() => generatePlan(days)} style={{ position: 'relative', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: planDuration === days ? 'white' : '#4b5563', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', transition: 'color 0.2s' }}>
                {planDuration === days &&
              <motion.div layoutId="durationTab" style={{ position: 'absolute', inset: 0, backgroundColor: '#e4002b', borderRadius: '0.5rem' }} initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              }
                <span style={{ position: 'relative', zIndex: 10 }}>{days} Days</span>
              </button>
            )}
          </div>
          <button onClick={() => generatePlan()} onMouseEnter={() => setGenHovered(true)} onMouseLeave={() => setGenHovered(false)} style={{ backgroundColor: genHovered ? '#c50025' : '#e4002b', color: 'white', padding: '0.625rem 1.5rem', borderRadius: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)' }}>
            Generate New Plan
          </button>
        </div>
      </div>

      {currentPlan &&
      <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '2rem' }}>
          <button onClick={() => navigate('/shopping-list')} onMouseEnter={() => setShopHovered(true)} onMouseLeave={() => setShopHovered(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: shopHovered ? '#c50025' : '#e4002b', color: 'white', borderRadius: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}>
            <ShoppingCartIcon style={{ width: 16, height: 16 }} /> Make Shopping List
          </button>
          <button onClick={handleSave} onMouseEnter={() => setSaveHovered(true)} onMouseLeave={() => setSaveHovered(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: saveHovered ? '#e5e7eb' : '#f3f4f6', color: '#374151', borderRadius: '0.5rem', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}>
            <SaveIcon style={{ width: 16, height: 16 }} /> {isSaving ? 'Saved!' : 'Save Plan'}
          </button>
        </div>
      }

      {!currentPlan ?
      <div style={{ textAlign: 'center', padding: '8rem 0', backgroundColor: 'white', borderRadius: '1.5rem', border: '2px dashed #d1d5db' }}>
          <CalendarDaysIcon style={{ width: 64, height: 64, color: '#d1d5db', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>No plan generated yet</h2>
          <p style={{ color: '#6b7280' }}>Click the button above to generate a meal plan.</p>
        </div> :

      <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
          <div style={{ minWidth: 1000 }}>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem', gridTemplateColumns: `100px repeat(${planDuration}, minmax(250px, 1fr))` }}>
              <div></div>
              {currentPlan.days.map((day, i) =>
            <div key={i} style={{ textAlign: 'center', fontWeight: 700, color: '#374151', backgroundColor: 'white', padding: '0.75rem 0', borderRadius: '0.75rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5' }}>Day {i + 1}</div>
            )}
            </div>
            {['breakfast', 'lunch', 'dinner'].map((mealType) =>
          <div key={mealType} style={{ display: 'grid', gap: '1rem', marginBottom: '1rem', gridTemplateColumns: `100px repeat(${planDuration}, minmax(250px, 1fr))` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}>{mealType}</div>
                {currentPlan.days.map((day, i) =>
            <div key={`${i}-${mealType}`} style={{ height: '100%' }}>
                    <MealCard meal={day[mealType]} onSwap={() => handleSwapClick(i, mealType)} />
                  </div>
            )}
              </div>
          )}
          </div>
        </div>
      }

      <AnimatePresence>
        {swapModal.isOpen &&
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ backgroundColor: '#f5f5f5', borderRadius: '1.5rem', padding: '2rem', maxWidth: 896, width: '100%', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', textTransform: 'capitalize' }}>Swap {swapModal.mealType}</h2>
                <button onClick={() => setSwapModal({ isOpen: false, dayIndex: null, mealType: null })} onMouseEnter={() => setCloseHovered(true)} onMouseLeave={() => setCloseHovered(false)} style={{ padding: '0.5rem', backgroundColor: closeHovered ? '#e5e7eb' : 'transparent', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
                  <XIcon style={{ width: 24, height: 24, color: '#6b7280' }} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                {swapOptions.map((meal) => <div key={meal.id} style={{ height: '100%' }}><MealCard meal={meal} onAdd={() => handleSelectSwap(meal)} /></div>)}
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

}