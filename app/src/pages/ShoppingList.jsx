import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMealPlan } from '../hooks/useMealPlan';
import {
  TrashIcon,
  ShoppingCartIcon
} from 'lucide-react';

export function ShoppingList() {
  const navigate = useNavigate();

  const {
    shoppingList,
    removeFromShoppingList,
    clearShoppingList,
    addAllToCart
  } = useMealPlan();

  const [selectedItems, setSelectedItems] = useState({});
  const [copied, setCopied] = useState(false);

  const groupedList = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleExport = () => {
    const text = Object.entries(groupedList)
      .map(
        ([cat, items]) =>
          `${cat}:\n` +
          items
            .map((i) => `- ${i.amount} ${i.unit} ${i.name}`)
            .join('\n')
      )
      .join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddAllToCart = () => {
    addAllToCart();
    navigate('/cart');
  };

  const handleAddCheckedToCart = () => {
    const selected = shoppingList.filter(
      (item) => selectedItems[item.id]
    );

    if (selected.length === 0) {
      alert('Please select at least one item.');
      return;
    }

    addAllToCart(selected);
    navigate('/cart');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', paddingBottom: '5rem' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800 }}>
          Shopping List
        </h1>
        <p style={{ color: '#6b7280' }}>
          Auto-generated from your meal plan
        </p>
      </div>

      {/* BUTTONS */}
      {shoppingList.length > 0 && (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>

          <button
            onClick={() => {
              if (window.confirm('Clear shopping list?')) {
                clearShoppingList();
              }
            }}
            style={btnStyle.redOutline}
          >
            🗑 Clear List
          </button>

          <button onClick={handleExport} style={btnStyle.gray}>
            📋 {copied ? 'Copied!' : 'Export List'}
          </button>

          <button onClick={handleAddCheckedToCart} style={btnStyle.green}>
            🛒 Add Checked to Cart
          </button>

          <button onClick={handleAddAllToCart} style={btnStyle.red}>
            🛍 Add All to Cart
          </button>
        </div>
      )}

      {/* LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {Object.entries(groupedList).map(([category, items]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              border: '1px solid #e5e5e5'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#e4002b' }}>
              {category}
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {items.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0'
                  }}
                >
                  <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={!!selectedItems[item.id]}
                      onChange={(e) =>
                        setSelectedItems((prev) => ({
                          ...prev,
                          [item.id]: e.target.checked
                        }))
                      }
                      style={{ width: 18, height: 18 }}
                    />
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                  </label>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280' }}>
                      {item.amount} {item.unit}
                    </span>

                    <button
                      onClick={() => removeFromShoppingList(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9ca3af'
                      }}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* BUTTON STYLES */
const btnStyle = {
  red: {
    padding: '0.85rem 1.4rem',
    background: '#e4002b',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(228,0,43,0.35)'
  },

  green: {
    padding: '0.85rem 1.4rem',
    background: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(22,163,74,0.35)'
  },

  gray: {
    padding: '0.85rem 1.4rem',
    background: '#f3f4f6',
    color: '#111827',
    border: '1px solid #d1d5db',
    borderRadius: '0.75rem',
    fontWeight: 700,
    cursor: 'pointer'
  },

  redOutline: {
    padding: '0.85rem 1.4rem',
    background: 'white',
    color: '#b91c1c',
    border: '2px solid #fecaca',
    borderRadius: '0.75rem',
    fontWeight: 800,
    cursor: 'pointer'
  }
};