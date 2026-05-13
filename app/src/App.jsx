
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MealPlanProvider } from './hooks/useMealPlan';
import { Topbar } from './components/Topbar';
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
                <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', color: '#1a1a1a' }}>
                  <Topbar />
                  <main style={{ paddingTop: 'calc(68px + 2rem)', paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '2.5rem' }}>
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
      </MealPlanProvider>
  );

}