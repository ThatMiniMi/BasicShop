import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './Components/ProductList'
import AdminPanel from './Components/AdminPanel'

function App()
{
  return (
    <main>
      <h1 className='text-2x1 font-bold p-4'>Product Shop</h1>
      <AdminPanel />
      {/* <ProductList /> */}
    </main>
  );
}

export default App
