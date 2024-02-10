import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { generateRoutes } from './utils/routeHelpers';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/PrivateChat';
import Home from "./pages/Home";

function App() {
    const routeDefinitions = [
        { path: '/login', component: Login, isPublic: true },
        { path: '/register', component: Register, isPublic: true },
        { path: '/chat', component: Chat },
        { path: '/', component: Home, isPublic: true },
    ];
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {generateRoutes(routeDefinitions)}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
