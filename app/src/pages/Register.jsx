
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { lifestyles } from '../data/lifestyles';
import { UtensilsIcon, AlertCircleIcon, CheckIcon } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', lifestyle: 'normal' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(formData);
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
          <p style={{ fontSize: '1.5rem', color: 'white', opacity: 0.95, lineHeight: 1.4 }}>Start your personalized meal planning journey today.</p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', overflowY: 'auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: 540, paddingBottom: '3rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>Create account</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Join plan2plate and start planning</p>

            {error &&
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                <AlertCircleIcon style={{ width: 20, height: 20, color: '#ef4444', flexShrink: 0 }} />
                <p style={{ color: '#dc2626', fontSize: '0.875rem', margin: 0 }}>{error}</p>
              </div>
            }

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#e4002b'} onBlur={(e) => e.target.style.borderColor = '#d1d5db'} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#e4002b'} onBlur={(e) => e.target.style.borderColor = '#d1d5db'} />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Password</label>
                <input type="password" required value={formData.password} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#e4002b'} onBlur={(e) => e.target.style.borderColor = '#d1d5db'} />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '1rem' }}>Choose your lifestyle</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {lifestyles.map((lifestyle) =>
                  <button key={lifestyle.id} type="button" onClick={() => setFormData((prev) => ({ ...prev, lifestyle: lifestyle.id }))} style={{ position: 'relative', padding: '1rem', border: formData.lifestyle === lifestyle.id ? '2px solid #e4002b' : '1px solid #e5e5e5', borderRadius: '0.75rem', backgroundColor: formData.lifestyle === lifestyle.id ? '#fef2f2' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }} onMouseEnter={(e) => {if (formData.lifestyle !== lifestyle.id) e.currentTarget.style.borderColor = '#d1d5db';}} onMouseLeave={(e) => {if (formData.lifestyle !== lifestyle.id) e.currentTarget.style.borderColor = '#e5e5e5';}}>
                      {formData.lifestyle === lifestyle.id &&
                    <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: 20, height: 20, backgroundColor: '#e4002b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckIcon style={{ width: 12, height: 12, color: 'white' }} />
                        </div>
                    }
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{lifestyle.emoji}</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.25rem' }}>{lifestyle.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{lifestyle.description}</div>
                    </button>
                  )}
                </div>
              </div>

              <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '0.875rem', backgroundColor: isLoading ? '#f87171' : '#e4002b', color: 'white', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#c50025')} onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#e4002b')}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
              Already have an account? <Link to="/login" style={{ color: '#e4002b', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>);

}