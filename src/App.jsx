import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { GridProvider } from './context/GridContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import './App.css'

function App() {
    return (
        <CartProvider>
            <GridProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                </Routes>
            </GridProvider>
        </CartProvider>
    )
}

export default App
