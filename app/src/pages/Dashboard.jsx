
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMealPlan } from '../data/useMealPlan';
import { CalendarDaysIcon, SparklesIcon, TagIcon, ArrowRightIcon } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function Dashboard() {
  const navigate = useNavigate();
  const { currentPlan, mealHistory } = useMealPlan();

  const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const todayMeals = currentPlan?.days[0];

  return (
    <div style={{ maxWidth: 1152, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2.5rem' }}>
        
        <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>Good morning, Jakob! 🍳</h1>
        <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>It's {todayStr}. Ready to plan your week?</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        
        <motion.button
          variants={itemVariants}
          onClick={() => navigate('/planner')}
          style={{
            backgroundColor: '#e4002b',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '1.5rem',
            textAlign: 'left',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c50025'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e4002b'}>
          
          <CalendarDaysIcon style={{ width: 32, height: 32, marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Plan Meals</h2>
          <p style={{ opacity: 0.85 }}>Generate a new weekly meal plan in seconds.</p>
        </motion.button>

        <motion.button
          variants={itemVariants}
          onClick={() => navigate('/inspired')}
          style={{
            backgroundColor: '#1a1a2e',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '1.5rem',
            textAlign: 'left',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d2d44'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a1a2e'}>
          
          <SparklesIcon style={{ width: 32, height: 32, marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Get Inspired</h2>
          <p style={{ opacity: 0.85 }}>Browse curated recipes and fresh ideas.</p>
        </motion.button>

        <motion.button
          variants={itemVariants}
          onClick={() => navigate('/deals')}
          style={{
            backgroundColor: 'white',
            color: '#e4002b',
            padding: '1.5rem',
            borderRadius: '1.5rem',
            textAlign: 'left',
            border: '2px solid #e4002b',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
          
          <TagIcon style={{ width: 32, height: 32, marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>View Deals</h2>
          <p style={{ opacity: 0.7, color: '#1a1a1a' }}>Save money with this week's Mercator discounts.</p>
        </motion.button>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>Today's Menu</h2>
            {currentPlan &&
            <button
              onClick={() => navigate('/planner')}
              style={{ color: '#e4002b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              
                View full plan <ArrowRightIcon style={{ width: 16, height: 16 }} />
              </button>
            }
          </div>
          
          {currentPlan && todayMeals ?
          <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5', display: 'flex', gap: '1.5rem' }}>
              {['breakfast', 'lunch', 'dinner'].map((mealType) =>
            <div key={mealType} style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>{mealType}</p>
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2.25rem', backgroundColor: 'white', width: 56, height: 56, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)' }}>
                      {todayMeals[mealType].image}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1.25 }}>{todayMeals[mealType].name}</h4>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{todayMeals[mealType].prepTime + todayMeals[mealType].cookTime} mins</p>
                    </div>
                  </div>
                </div>
            )}
            </div> :

          <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '2px dashed #d1d5db', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, backgroundColor: '#f9fafb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CalendarDaysIcon style={{ width: 32, height: 32, color: '#9ca3af' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>No plan for today</h3>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Generate a meal plan to see your daily menu here.</p>
              <button
              onClick={() => navigate('/planner')}
              style={{ backgroundColor: '#e4002b', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.75rem', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
              
                Create Plan
              </button>
            </div>
          }
        </div>

        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem' }}>Your Stats</h2>
          <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Plans Created</p>
              <p style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1a1a1a' }}>{mealHistory.length}</p>
            </div>
            <div style={{ height: 1, backgroundColor: '#f3f4f6', width: '100%', marginBottom: '1.5rem' }} />
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Money Saved This Month</p>
              <p style={{ fontSize: '1.875rem', fontWeight: 700, color: '#16a34a' }}>€24.50</p>
            </div>
            <div style={{ height: 1, backgroundColor: '#f3f4f6', width: '100%', marginBottom: '1.5rem' }} />
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Favorite Category</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🍝 Italian
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}