import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MealPlanProvider } from './data/useMealPlan';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { MealPlanner } from './pages/MealPlanner';
import { ShoppingList } from './pages/ShoppingList';
import { Cart } from './pages/Cart';
import { GetInspired } from './pages/GetInspired';
import { Deals } from './pages/Deals';
import { MealHistory } from './pages/MealHistory';
import { SavedPlans } from './pages/SavedPlans';

export function App() {
  return (
    <MealPlanProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#faf8f5', color: '#1f2937' }}>
          <Sidebar />
          <main className="main-content" style={{ flex: 1, marginLeft: 260, padding: '2.5rem', overflowY: 'auto', height: '100vh' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/planner" element={<MealPlanner />} />
              <Route path="/saved" element={<SavedPlans />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/inspired" element={<GetInspired />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/history" element={<MealHistory />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MealPlanProvider>);

}