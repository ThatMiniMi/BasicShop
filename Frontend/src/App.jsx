import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './Components/AdminPanel';
import ProductList from './Components/ProductList';

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Product Shop</h1>
          <nav className="mt-2 space-x-4">
            <Link to="/" className="underline">Shop</Link>
            <Link to="/admin" className="underline">Admin</Link>
          </nav>
        </header>
        
        <section className="p-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </section>
      </main>
    </Router>
  );
}

export default App;