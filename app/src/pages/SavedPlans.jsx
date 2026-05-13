

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMealPlan } from '../hooks/useMealPlan';
import { BookmarkIcon, CalendarIcon, RefreshCwIcon, Trash2Icon, ShoppingCartIcon } from 'lucide-react';

export function SavedPlans() {
  const navigate = useNavigate();
  const { savedPlans, reusePlan, deleteSavedPlan, generateShoppingList } = useMealPlan();
  const [btnHovered, setBtnHovered] = useState(false);
  const [reuseHovered, setReuseHovered] = useState({});
  const [deleteHovered, setDeleteHovered] = useState({});
  const [shopHovered, setShopHovered] = useState({});
  const [expandedPlan, setExpandedPlan] = useState(null);

  const handleReuse = (plan) => {reusePlan(plan);navigate('/planner');};
  const handleMakeList = (plan) => {generateShoppingList(plan);navigate('/shopping-list');};
  const toggleExpand = (planId) => setExpandedPlan((prev) => prev === planId ? null : planId);

  return (
    <div style={{ maxWidth: 1024, margin: '0 auto', paddingBottom: '5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '1rem' }}>
          <BookmarkIcon style={{ width: 32, height: 32, color: '#e4002b' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.25rem' }}>Saved Plans</h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>Your bookmarked meal plans, ready to reuse anytime.</p>
        </div>
      </div>

      {savedPlans.length === 0 ?
      <div style={{ textAlign: 'center', padding: '8rem 0', backgroundColor: 'white', borderRadius: '1.5rem', border: '2px dashed #d1d5db' }}>
          <BookmarkIcon style={{ width: 64, height: 64, color: '#d1d5db', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>No saved plans yet</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Generate a meal plan and click "Save Plan" to bookmark it here.</p>
          <button onClick={() => navigate('/planner')} onMouseEnter={() => setBtnHovered(true)} onMouseLeave={() => setBtnHovered(false)} style={{ backgroundColor: btnHovered ? '#c50025' : '#e4002b', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Go to Meal Planner</button>
        </div> :

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {savedPlans.map((plan) => {
          const dateStr = new Date(plan.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          const isExpanded = expandedPlan === plan.id;
          return (
            <div key={plan.id} style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => toggleExpand(plan.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: 56, height: 56, backgroundColor: '#f5f5f5', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e5e5' }}>
                      <CalendarIcon style={{ width: 28, height: 28, color: '#e4002b' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.25rem' }}>Saved on {dateStr}</h3>
                      <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{plan.duration} Days • {plan.duration * 3} Meals</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button onClick={(e) => {e.stopPropagation();handleMakeList(plan);}} onMouseEnter={() => setShopHovered((p) => ({ ...p, [plan.id]: true }))} onMouseLeave={() => setShopHovered((p) => ({ ...p, [plan.id]: false }))} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', backgroundColor: shopHovered[plan.id] ? '#c50025' : '#e4002b', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.875rem' }}>
                      <ShoppingCartIcon style={{ width: 16, height: 16 }} /> Make Shopping List
                    </button>
                    <button onClick={(e) => {e.stopPropagation();handleReuse(plan);}} onMouseEnter={() => setReuseHovered((p) => ({ ...p, [plan.id]: true }))} onMouseLeave={() => setReuseHovered((p) => ({ ...p, [plan.id]: false }))} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', backgroundColor: reuseHovered[plan.id] ? '#fef2f2' : '#f5f5f5', color: '#e4002b', border: '1px solid rgba(228, 0, 43, 0.2)', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.875rem' }}>
                      <RefreshCwIcon style={{ width: 16, height: 16 }} /> Reuse
                    </button>
                    <button onClick={(e) => {e.stopPropagation();deleteSavedPlan(plan.id);}} onMouseEnter={() => setDeleteHovered((p) => ({ ...p, [plan.id]: true }))} onMouseLeave={() => setDeleteHovered((p) => ({ ...p, [plan.id]: false }))} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: deleteHovered[plan.id] ? '#fef2f2' : 'transparent', color: deleteHovered[plan.id] ? '#b91c1c' : '#9ca3af', border: '1px solid transparent', borderRadius: '0.5rem', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.875rem' }}>
                      <Trash2Icon style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
                {isExpanded &&
              <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(plan.duration, 7)}, 1fr)`, gap: '0.75rem', paddingTop: '1rem' }}>
                      {plan.days.map((day, i) =>
                  <div key={i} style={{ backgroundColor: '#f5f5f5', borderRadius: '0.75rem', padding: '0.75rem', fontSize: '0.8rem' }}>
                          <p style={{ fontWeight: 700, color: '#e4002b', marginBottom: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Day {i + 1}</p>
                          {['breakfast', 'lunch', 'dinner'].map((type) =>
                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                              <span>{day[type].image}</span>
                              <span style={{ color: '#374151', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{day[type].name}</span>
                            </div>
                    )}
                        </div>
                  )}
                    </div>
                  </div>
              }
              </div>);

        })}
        </div>
      }
    </div>);

}