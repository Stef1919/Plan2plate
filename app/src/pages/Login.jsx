
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { UtensilsIcon, AlertCircleIcon } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ flex: 1, backgroundColor: '#e4002b', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }}></div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 480 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem' }}>
              <UtensilsIcon style={{ width: 40, height: 40, color: '#e4002b' }} />
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 700, color: 'white', margin: 0 }}>plan2plate</h1>
          </div>
          <p style={{ fontSize: '1.5rem', color: 'white', opacity: 0.95, lineHeight: 1.4 }}>Your personalized meal planning companion. Plan smarter, eat better.</p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>Welcome back</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Sign in to continue to your meal plans</p>

            {error &&
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                <AlertCircleIcon style={{ width: 20, height: 20, color: '#ef4444', flexShrink: 0 }} />
                <p style={{ color: '#dc2626', fontSize: '0.875rem', margin: 0 }}>{error}</p>
              </div>
            }

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#e4002b'} onBlur={(e) => e.target.style.borderColor = '#d1d5db'} />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Password</label>
                <input type="password" required value={formData.password} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#e4002b'} onBlur={(e) => e.target.style.borderColor = '#d1d5db'} />
              </div>

              <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '0.875rem', backgroundColor: isLoading ? '#f87171' : '#e4002b', color: 'white', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#c50025')} onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#e4002b')}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
              Don't have an account? <Link to="/register" style={{ color: '#e4002b', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>);

}