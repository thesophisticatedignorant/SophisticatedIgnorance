import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { GridProvider } from './context/GridContext'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import AuthPage from './pages/AuthPage'
import RequestReview from './pages/RequestReview'
import RequestConfirmation from './pages/RequestConfirmation'
import ClientDashboard from './pages/ClientDashboard'
import HouseAdmin from './pages/HouseAdmin'
import './App.css'

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <GridProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/shop/:productId" element={<Shop />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/request-review" element={<RequestReview />} />
                        <Route path="/request-confirmation" element={<RequestConfirmation />} />
                        <Route path="/dashboard" element={<ClientDashboard />} />
                        <Route path="/house-admin" element={<HouseAdmin />} />
                    </Routes>
                </GridProvider>
            </CartProvider>
        </AuthProvider>
    )
}

export default App
