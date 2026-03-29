
import { NavLink } from 'react-router-dom';
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
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: 260,
        backgroundColor: '#ffffff',
        color: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        borderRight: '1px solid #e5e5e5'
      }}>
      
      <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ backgroundColor: '#e4002b', padding: '0.5rem', borderRadius: '0.75rem' }}>
          <UtensilsIcon style={{ width: 24, height: 24, color: 'white' }} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', margin: 0, color: '#1a1a1a' }}>plan2plate</h1>
      </div>

      <nav style={{ flex: 1, padding: '0 1rem', marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) =>
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            
              {({ isActive }) =>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                backgroundColor: isActive ? '#fef2f2' : 'transparent',
                color: isActive ? '#e4002b' : '#6b7280',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.2s',
                cursor: 'pointer',
                borderLeft: isActive ? '3px solid #e4002b' : '3px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#1a1a1a';
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#6b7280';
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

      <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e5e5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#e4002b',
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
            <p style={{ fontWeight: 500, fontSize: '0.875rem', margin: 0, color: '#1a1a1a' }}>Jakob</p>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Pro Member</p>
          </div>
        </div>
      </div>
    </aside>);

}