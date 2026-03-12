
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMealPlan } from '../data/useMealPlan';
import { HistoryIcon, CalendarIcon, RefreshCwIcon, Trash2Icon } from 'lucide-react';

export function MealHistory() {
  const navigate = useNavigate();
  const { mealHistory, reusePlan, deleteFromHistory } = useMealPlan();
  const [btnHovered, setBtnHovered] = useState(false);
  const [reuseHovered, setReuseHovered] = useState({});
  const [deleteHovered, setDeleteHovered] = useState({});

  const handleReuse = (plan) => {
    reusePlan(plan);
    navigate('/planner');
  };

  return (
    <div style={{ maxWidth: 1024, margin: '0 auto', paddingBottom: '5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#eff6ff', padding: '0.75rem', borderRadius: '1rem' }}>
          <HistoryIcon style={{ width: 32, height: 32, color: '#1d4ed8' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>Meal History</h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>All your past meal plans. Reuse or clean up as needed.</p>
        </div>
      </div>

      {mealHistory.length === 0 ?
      <div style={{ textAlign: 'center', padding: '8rem 0', backgroundColor: 'white', borderRadius: '1.5rem', border: '2px dashed #d1d5db' }}>
          <HistoryIcon style={{ width: 64, height: 64, color: '#d1d5db', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>No history yet</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Generate a meal plan to see it appear here.</p>
          <button
          onClick={() => navigate('/planner')}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            backgroundColor: btnHovered ? '#3a5233' : '#4a6741',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '0.75rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>
          
            Go to Meal Planner
          </button>
        </div> :

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mealHistory.map((plan) => {
          const dateStr = new Date(plan.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
          });

          return (
            <div key={plan.id} style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: 56, height: 56, backgroundColor: '#faf8f5', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                    <CalendarIcon style={{ width: 28, height: 28, color: '#4a6741' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>{plan.duration}-Day Plan</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{dateStr} • {plan.duration * 3} Meals</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                  onClick={() => handleReuse(plan)}
                  onMouseEnter={() => setReuseHovered((prev) => ({ ...prev, [plan.id]: true }))}
                  onMouseLeave={() => setReuseHovered((prev) => ({ ...prev, [plan.id]: false }))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1.25rem',
                    backgroundColor: reuseHovered[plan.id] ? '#4a6741' : '#faf8f5',
                    color: reuseHovered[plan.id] ? 'white' : '#4a6741',
                    border: '1px solid rgba(74, 103, 65, 0.2)',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.875rem'
                  }}>
                  
                    <RefreshCwIcon style={{ width: 16, height: 16 }} />
                    Reuse
                  </button>
                  <button
                  onClick={() => deleteFromHistory(plan.id)}
                  onMouseEnter={() => setDeleteHovered((prev) => ({ ...prev, [plan.id]: true }))}
                  onMouseLeave={() => setDeleteHovered((prev) => ({ ...prev, [plan.id]: false }))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: deleteHovered[plan.id] ? '#fef2f2' : 'transparent',
                    color: deleteHovered[plan.id] ? '#b91c1c' : '#9ca3af',
                    border: '1px solid transparent',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.875rem'
                  }}>
                  
                    <Trash2Icon style={{ width: 16, height: 16 }} />
                    Delete
                  </button>
                </div>
              </div>);

        })}
        </div>
      }
    </div>);

}