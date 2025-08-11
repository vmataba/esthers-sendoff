import './app.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InvitationCards from "./components/card/invitation-cards.component.tsx";
import Pledges from "./components/pledge/pledges.component.tsx";
import InvitationCardDetails from "./components/card/invitation-card-details.component.tsx";
import Login from "./components/auth/login.component.tsx";
import Navbar from "./components/navigation/navbar.component.tsx";
import ProtectedRoute from "./components/auth/protected-route.component.tsx";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    {/* Redirect root to pledges as default */}
                    <Route path="/" element={<Navigate to="/pledges" replace />} />
                    
                    {/* Public Routes */}
                    <Route path="/pledges" element={<Pledges />} />
                    <Route path="/invitation-cards/:id" element={<InvitationCardDetails />} />
                    <Route path="/login" element={<Login />} />
                    
                    {/* Protected Routes */}
                    <Route 
                        path="/invitation-cards" 
                        element={
                            <ProtectedRoute>
                                <InvitationCards />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* 404 - Not Found */}
                    <Route path="*" element={
                        <div className="text-center mt-5">
                            <h2>Page Not Found</h2>
                            <p>The requested page does not exist.</p>
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App
