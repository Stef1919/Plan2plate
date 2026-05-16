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
  HistoryIcon
} from 'lucide-react';

const navItems = [
  { path: '/', name: 'Dashboard', icon: LayoutDashboardIcon },
  { path: '/planner', name: 'Meal Planner', icon: CalendarDaysIcon },
  { path: '/saved', name: 'Saved Plans', icon: BookmarkIcon },
  { path: '/inspired', name: 'Get Inspired', icon: SparklesIcon },
  { path: '/deals', name: 'Deals', icon: TagIcon },
  { path: '/history', name: 'Meal History', icon: HistoryIcon },

  // ✅ NEW ITEM ADDED
  { path: '/shopping-list', name: 'Shopping List', icon: ShoppingCartIcon }
];

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

  const currentLifestyle =
    lifestyles.find((l) => l.id === user?.lifestyle) ||
    lifestyles[0];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 68,
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e5e5',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem'
      }}
    >
      {/* LOGO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ backgroundColor: '#e4002b', padding: '0.5rem', borderRadius: '0.75rem' }}>
          <UtensilsIcon style={{ width: 24, height: 24, color: 'white' }} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
          plan2plate
        </h1>
      </div>

      {/* NAV */}
      <nav style={{ display: 'flex', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: 'none', position: 'relative' }}
          >
            {({ isActive }) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  color: isActive ? '#e4002b' : '#6b7280',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                <item.icon style={{ width: 18, height: 18 }} />
                <span>{item.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    style={{
                      position: 'absolute',
                      bottom: -17,
                      left: 0,
                      right: 0,
                      height: 3,
                      backgroundColor: '#e4002b',
                      borderRadius: '3px 3px 0 0'
                    }}
                  />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* RIGHT SIDE (cart + profile) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => navigate('/cart')}
          onMouseEnter={() => setCartHovered(true)}
          onMouseLeave={() => setCartHovered(false)}
          style={{
            position: 'relative',
            padding: '0.5rem',
            backgroundColor: cartHovered ? '#f9fafb' : 'transparent',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <ShoppingCartIcon style={{ width: 22, height: 22, color: '#374151' }} />

          {cart.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                minWidth: 18,
                height: 18,
                backgroundColor: '#e4002b',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.625rem',
                fontWeight: 700,
                color: 'white'
              }}
            >
              {cart.length}
            </div>
          )}
        </button>

        {/* PROFILE (unchanged) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#e4002b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700
              }}
            >
              {user?.avatarInitial}
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div
                  onClick={() => setIsProfileOpen(false)}
                  style={{ position: 'fixed', inset: 0 }}
                />

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    width: 320,
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    border: '1px solid #e5e5e5'
                  }}
                >
                  {/* unchanged profile content */}
                  <div style={{ padding: '1rem' }}>
                    <button onClick={handleLogout}>
                      <LogOutIcon />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}