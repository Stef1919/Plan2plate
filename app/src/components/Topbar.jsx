
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useMealPlan } from '../hooks/useMealPlan';
import { lifestyles } from '../data/lifestyles';
import {
  UtensilsIcon,
  ShoppingCartIcon,
  LogOutIcon,
  CheckIcon,
  LayoutDashboardIcon,
  CalendarDaysIcon,
  BookmarkIcon,
  SparklesIcon,
  TagIcon,
  HistoryIcon } from
'lucide-react';

const navItems = [
{ path: '/', name: 'Dashboard', icon: LayoutDashboardIcon },
{ path: '/planner', name: 'Meal Planner', icon: CalendarDaysIcon },
{ path: '/saved', name: 'Saved Plans', icon: BookmarkIcon },
{ path: '/inspired', name: 'Get Inspired', icon: SparklesIcon },
{ path: '/deals', name: 'Deals', icon: TagIcon },
{ path: '/history', name: 'Meal History', icon: HistoryIcon }];


export function Topbar() {
  const navigate = useNavigate();
  const { user, logout, updateLifestyle } = useAuth();
  const { cart } = useMealPlan();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartHovered, setCartHovered] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentLifestyle = lifestyles.find((l) => l.id === user?.lifestyle) || lifestyles[0];

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 68, backgroundColor: 'white', borderBottom: '1px solid #e5e5e5', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ backgroundColor: '#e4002b', padding: '0.5rem', borderRadius: '0.75rem' }}>
          <UtensilsIcon style={{ width: 24, height: 24, color: 'white' }} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', margin: 0, color: '#1a1a1a' }}>plan2plate</h1>
      </div>

      <nav style={{ display: 'flex', gap: '0.5rem' }}>
        {navItems.map((item) =>
        <NavLink key={item.path} to={item.path} style={{ textDecoration: 'none', position: 'relative' }}>
            {({ isActive }) =>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', color: isActive ? '#e4002b' : '#6b7280', fontWeight: isActive ? 600 : 500, fontSize: '0.875rem', transition: 'color 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => !isActive && (e.currentTarget.style.color = '#1a1a1a')} onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = '#6b7280')}>
                <item.icon style={{ width: 18, height: 18 }} />
                <span>{item.name}</span>
                {isActive &&
            <motion.div layoutId="activeNav" style={{ position: 'absolute', bottom: -17, left: 0, right: 0, height: 3, backgroundColor: '#e4002b', borderRadius: '3px 3px 0 0' }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
            }
              </div>
          }
          </NavLink>
        )}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => navigate('/cart')} onMouseEnter={() => setCartHovered(true)} onMouseLeave={() => setCartHovered(false)} style={{ position: 'relative', padding: '0.5rem', backgroundColor: cartHovered ? '#f9fafb' : 'transparent', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}>
          <ShoppingCartIcon style={{ width: 22, height: 22, color: '#374151' }} />
          {cart.length > 0 &&
          <div style={{ position: 'absolute', top: 2, right: 2, minWidth: 18, height: 18, backgroundColor: '#e4002b', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 0.25rem', fontSize: '0.625rem', fontWeight: 700, color: 'white' }}>
              {cart.length}
            </div>
          }
        </button>

        <div style={{ position: 'relative' }}>
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e4002b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>
              {user?.avatarInitial}
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen &&
            <>
                <div onClick={() => setIsProfileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.15 }} style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', width: 320, backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', border: '1px solid #e5e5e5', zIndex: 50, overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e5e5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#e4002b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>
                        {user?.avatarInitial}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, color: '#1a1a1a', margin: 0 }}>{user?.name}</p>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>{user?.email}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{currentLifestyle.emoji}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>{currentLifestyle.name}</span>
                    </div>
                  </div>

                  <div style={{ padding: '1rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>Change Lifestyle</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {lifestyles.map((lifestyle) =>
                    <button key={lifestyle.id} onClick={() => {updateLifestyle(lifestyle.id);setIsProfileOpen(false);}} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: user?.lifestyle === lifestyle.id ? '#fef2f2' : 'transparent', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', transition: 'background-color 0.2s', textAlign: 'left' }} onMouseEnter={(e) => user?.lifestyle !== lifestyle.id && (e.currentTarget.style.backgroundColor = '#f9fafb')} onMouseLeave={(e) => user?.lifestyle !== lifestyle.id && (e.currentTarget.style.backgroundColor = 'transparent')}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.25rem' }}>{lifestyle.emoji}</span>
                            <div>
                              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a1a' }}>{lifestyle.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{lifestyle.description}</div>
                            </div>
                          </div>
                          {user?.lifestyle === lifestyle.id &&
                      <CheckIcon style={{ width: 18, height: 18, color: '#e4002b' }} />
                      }
                        </button>
                    )}
                    </div>
                  </div>

                  <div style={{ padding: '1rem', borderTop: '1px solid #e5e5e5' }}>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem', backgroundColor: 'transparent', border: 'none', borderRadius: '0.5rem', color: '#ef4444', fontWeight: 500, cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <LogOutIcon style={{ width: 18, height: 18 }} />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            }
          </AnimatePresence>
        </div>
      </div>
    </header>);

}