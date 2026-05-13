
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMealPlan } from '../hooks/useMealPlan';
import { ShoppingCartIcon, TrashIcon, CopyIcon, CheckIcon, Trash2Icon } from 'lucide-react';

export function ShoppingList() {
  const navigate = useNavigate();
  const { shoppingList, removeFromShoppingList, clearShoppingList, addAllToCart } = useMealPlan();
  const [copied, setCopied] = useState(false);
  const [exportHovered, setExportHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  const [clearHovered, setClearHovered] = useState(false);
  const [planHovered, setPlanHovered] = useState(false);
  const [hoveredItems, setHoveredItems] = useState({});

  const groupedList = shoppingList.reduce((acc, item) => {if (!acc[item.category]) acc[item.category] = [];acc[item.category].push(item);return acc;}, {});
  const handleExport = () => {const text = Object.entries(groupedList).map(([cat, items]) => `${cat}:\n` + items.map((i) => `- ${i.amount} ${i.unit} ${i.name}`).join('\n')).join('\n\n');navigator.clipboard.writeText(text);setCopied(true);setTimeout(() => setCopied(false), 2000);};
  const handleAddToCart = () => {addAllToCart();navigate('/cart');};

  return (
    <div style={{ maxWidth: 896, margin: '0 auto', paddingBottom: '5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>Shopping List</h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>Auto-generated from your meal plan. Duplicates merged.</p>
        </div>
        {shoppingList.length > 0 &&
        <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => {if (window.confirm('Remove all items from your shopping list?')) clearShoppingList();}} onMouseEnter={() => setClearHovered(true)} onMouseLeave={() => setClearHovered(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', backgroundColor: clearHovered ? '#fef2f2' : 'white', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '0.75rem', fontWeight: 500, cursor: 'pointer', transition: 'background-color 0.2s' }}>
              <Trash2Icon style={{ width: 20, height: 20 }} /> Clear List
            </button>
            <button onClick={handleExport} onMouseEnter={() => setExportHovered(true)} onMouseLeave={() => setExportHovered(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', backgroundColor: exportHovered ? '#f9fafb' : 'white', border: '1px solid #e5e5e5', color: '#374151', borderRadius: '0.75rem', fontWeight: 500, cursor: 'pointer' }}>
              {copied ? <CheckIcon style={{ width: 20, height: 20, color: '#10b981' }} /> : <CopyIcon style={{ width: 20, height: 20 }} />}
              {copied ? 'Copied!' : 'Export List'}
            </button>
            <button onClick={handleAddToCart} onMouseEnter={() => setAddHovered(true)} onMouseLeave={() => setAddHovered(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.5rem', backgroundColor: addHovered ? '#c50025' : '#e4002b', color: 'white', borderRadius: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              <ShoppingCartIcon style={{ width: 20, height: 20 }} /> Add All to Cart
            </button>
          </div>
        }
      </div>

      {shoppingList.length === 0 ?
      <div style={{ textAlign: 'center', padding: '8rem 0', backgroundColor: 'white', borderRadius: '1.5rem', border: '2px dashed #d1d5db' }}>
          <div style={{ width: 80, height: 80, backgroundColor: '#f9fafb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <ShoppingCartIcon style={{ width: 40, height: 40, color: '#d1d5db' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Your list is empty</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Generate a meal plan to automatically build your shopping list.</p>
          <button onClick={() => navigate('/planner')} onMouseEnter={() => setPlanHovered(true)} onMouseLeave={() => setPlanHovered(false)} style={{ backgroundColor: planHovered ? '#c50025' : '#e4002b', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Go to Meal Planner
          </button>
        </div> :

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {Object.entries(groupedList).map(([category, items]) =>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={category} style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#e4002b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.75rem' }}>
                {category}
                <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#9ca3af', backgroundColor: '#f3f4f6', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>{items.length}</span>
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map((item) =>
            <li key={item.id} onMouseEnter={() => setHoveredItems((p) => ({ ...p, [item.id]: true }))} onMouseLeave={() => setHoveredItems((p) => ({ ...p, [item.id]: false }))} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flex: 1 }}>
                      <input type="checkbox" style={{ width: 20, height: 20, accentColor: '#e4002b' }} />
                      <span style={{ color: '#1a1a1a', fontWeight: 500 }}>{item.name}</span>
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ color: '#6b7280', backgroundColor: '#f9fafb', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontWeight: 500 }}>{item.amount} {item.unit}</span>
                      <button onClick={() => removeFromShoppingList(item.id)} style={{ color: hoveredItems[item.id] ? '#ef4444' : '#d1d5db', padding: '0.25rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', opacity: hoveredItems[item.id] ? 1 : 0, transition: 'all 0.2s' }}>
                        <TrashIcon style={{ width: 16, height: 16 }} />
                      </button>
                    </div>
                  </li>
            )}
              </ul>
            </motion.div>
        )}
        </div>
      }
    </div>);

}