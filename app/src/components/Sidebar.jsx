
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboardIcon,
  CalendarDaysIcon,
  ListIcon,
  ShoppingCartIcon,
  SparklesIcon,
  TagIcon,
  HistoryIcon,
  BookmarkIcon,
  UtensilsIcon } from
'lucide-react';

const navItems = [
{ path: '/', name: 'Dashboard', icon: LayoutDashboardIcon },
{ path: '/planner', name: 'Meal Planner', icon: CalendarDaysIcon },
{ path: '/saved', name: 'Saved Plans', icon: BookmarkIcon },
{ path: '/shopping-list', name: 'Shopping List', icon: ListIcon },
{ path: '/cart', name: 'Cart', icon: ShoppingCartIcon },
{ path: '/inspired', name: 'Get Inspired', icon: SparklesIcon },
{ path: '/deals', name: 'Deals', icon: TagIcon },
{ path: '/history', name: 'Meal History', icon: HistoryIcon }];


export function Sidebar() {
  return (
    <aside
      className="sidebar-nav"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: 260,
        backgroundColor: '#2d3a29',
        color: '#faf8f5',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
      }}>
      
      <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ backgroundColor: '#e8723a', padding: '0.5rem', borderRadius: '0.75rem' }}>
          <UtensilsIcon style={{ width: 24, height: 24, color: 'white' }} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>plan2plate</h1>
      </div>

      <nav style={{ flex: 1, padding: '0 1rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) =>
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
            className={({ isActive }) =>
            isActive ? 'nav-item-active' : 'nav-item'
            }>
            
              {({ isActive }) =>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                backgroundColor: isActive ? '#4a6741' : 'transparent',
                color: isActive ? 'white' : '#9ca3af',
                fontWeight: 500,
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#9ca3af';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}>
              
                  <item.icon style={{ width: 20, height: 20 }} />
                  <span>{item.name}</span>
                </div>
            }
            </NavLink>
          )}
        </div>
      </nav>

      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#6b8f5e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.125rem'
          }}>
            J
          </div>
          <div>
            <p style={{ fontWeight: 500, fontSize: '0.875rem', margin: 0 }}>Jakob</p>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Pro Member</p>
          </div>
        </div>
      </div>
    </aside>);

}