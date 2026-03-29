
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMealPlan } from '../data/useMealPlan';
import { TruckIcon, StoreIcon, CreditCardIcon, MapPinIcon, CheckCircleIcon } from 'lucide-react';

export function Cart() {
  const navigate = useNavigate();
  const { cart, clearCart } = useMealPlan();
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);
  const [placeHovered, setPlaceHovered] = useState(false);

  const subtotal = cart.length * 2.5;
  const deliveryFee = deliveryMethod === 'delivery' ? 4.99 : 0;
  const total = subtotal + deliveryFee;
  const handlePlaceOrder = () => {setIsOrderPlaced(true);setTimeout(() => {clearCart();navigate('/');}, 3000);};

  if (isOrderPlaced) {
    return (
      <div style={{ maxWidth: 672, margin: '0 auto', paddingTop: '5rem', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
          <CheckCircleIcon style={{ width: 128, height: 128, color: '#e4002b', margin: '0 auto 1.5rem' }} />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>Order Confirmed!</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontSize: '1.25rem', color: '#4b5563' }}>Your ingredients are being prepared by Mercator.<br />Redirecting to dashboard...</motion.p>
      </div>);

  }

  return (
    <div style={{ maxWidth: 1152, margin: '0 auto', paddingBottom: '5rem' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '2rem' }}>Mercator Checkout</h1>
      {cart.length === 0 ?
      <div style={{ textAlign: 'center', padding: '5rem 0', backgroundColor: 'white', borderRadius: '1.5rem', border: '2px dashed #d1d5db' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Your cart is empty</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Add items from your shopping list to checkout.</p>
          <button onClick={() => navigate('/shopping-list')} onMouseEnter={() => setShopHovered(true)} onMouseLeave={() => setShopHovered(false)} style={{ backgroundColor: shopHovered ? '#c50025' : '#e4002b', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Go to Shopping List</button>
        </div> :

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>1. Delivery Method</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button onClick={() => setDeliveryMethod('delivery')} style={{ padding: '1rem', borderRadius: '0.75rem', border: deliveryMethod === 'delivery' ? '2px solid #e4002b' : '2px solid #e5e5e5', backgroundColor: deliveryMethod === 'delivery' ? '#fef2f2' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <TruckIcon style={{ width: 32, height: 32, color: deliveryMethod === 'delivery' ? '#e4002b' : '#9ca3af' }} />
                  <span style={{ fontWeight: 700, color: '#1a1a1a' }}>Home Delivery</span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>€4.99 fee</span>
                </button>
                <button onClick={() => setDeliveryMethod('pickup')} style={{ padding: '1rem', borderRadius: '0.75rem', border: deliveryMethod === 'pickup' ? '2px solid #e4002b' : '2px solid #e5e5e5', backgroundColor: deliveryMethod === 'pickup' ? '#fef2f2' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <StoreIcon style={{ width: 32, height: 32, color: deliveryMethod === 'pickup' ? '#e4002b' : '#9ca3af' }} />
                  <span style={{ fontWeight: 700, color: '#1a1a1a' }}>Store Pickup</span>
                  <span style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: 500 }}>Free</span>
                </button>
              </div>
              <AnimatePresence>
                {deliveryMethod === 'delivery' &&
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6', overflow: 'hidden' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>Delivery Address</label>
                    <div style={{ position: 'relative' }}>
                      <MapPinIcon style={{ position: 'absolute', left: 12, top: 12, width: 20, height: 20, color: '#9ca3af' }} />
                      <input type="text" defaultValue="Slovenska cesta 1, 1000 Ljubljana" style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.625rem', paddingBottom: '0.625rem', border: '1px solid #e5e5e5', borderRadius: '0.75rem', outline: 'none' }} />
                    </div>
                  </motion.div>
              }
              </AnimatePresence>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>2. Payment Method</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', border: paymentMethod === 'card' ? '2px solid #e4002b' : '2px solid #e5e5e5', backgroundColor: paymentMethod === 'card' ? '#fef2f2' : 'white', cursor: 'pointer' }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} style={{ width: 20, height: 20, accentColor: '#e4002b' }} />
                  <CreditCardIcon style={{ width: 24, height: 24, color: '#4b5563' }} />
                  <div><p style={{ fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Pre-pay with Card</p><p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Visa, Mastercard, Apple Pay</p></div>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', border: paymentMethod === 'ondelivery' ? '2px solid #e4002b' : '2px solid #e5e5e5', backgroundColor: paymentMethod === 'ondelivery' ? '#fef2f2' : 'white', cursor: 'pointer' }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'ondelivery'} onChange={() => setPaymentMethod('ondelivery')} style={{ width: 20, height: 20, accentColor: '#e4002b' }} />
                  <StoreIcon style={{ width: 24, height: 24, color: '#4b5563' }} />
                  <div><p style={{ fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Pay on {deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}</p><p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Cash or card accepted</p></div>
                </label>
              </div>
            </div>
          </div>
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', border: '1px solid #e5e5e5', position: 'sticky', top: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem' }}>Order Summary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: 256, overflowY: 'auto', paddingRight: '0.5rem' }}>
                {cart.map((item) => <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}><span style={{ color: '#4b5563' }}>{item.amount} {item.unit} {item.name}</span><span style={{ fontWeight: 500, color: '#1a1a1a' }}>€2.50</span></div>)}
              </div>
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563' }}><span>Subtotal ({cart.length} items)</span><span>€{subtotal.toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563' }}><span>Delivery Fee</span><span>{deliveryFee === 0 ? 'Free' : `€${deliveryFee.toFixed(2)}`}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}><span>Total</span><span>€{total.toFixed(2)}</span></div>
              </div>
              <button onClick={handlePlaceOrder} onMouseEnter={() => setPlaceHovered(true)} onMouseLeave={() => setPlaceHovered(false)} style={{ width: '100%', backgroundColor: placeHovered ? '#c50025' : '#e4002b', color: 'white', padding: '1rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1.125rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>Place Order</button>
            </div>
          </div>
        </div>
      }
    </div>);

}