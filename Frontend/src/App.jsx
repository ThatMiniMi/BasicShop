import './App.css';
import AdminPanel from './Components/AdminPanel';

function App() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Product Shop Admin</h1>
      </header>
      
      <section className="p-4">
        <AdminPanel />
      </section>
    </main>
  );
}

export default App;