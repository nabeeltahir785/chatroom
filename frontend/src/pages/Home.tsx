import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from "../form/Button";

type ButtonLinkProps = {
    to: string;
    label: string;
};
const Home = () => {
    const ButtonLink = ({ to, label }: ButtonLinkProps) => (
        <Link to={to} className="mx-2">
            <Button variant="primary">{label}</Button>
        </Link>
    );
    const { isAuthenticated } = useAuth();
    const routes = isAuthenticated ? [
        { to: '/chat', label: 'Chat' },
        { to: '/private-room', label: 'Private Room' }
    ] : [
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Register' }
    ];
    return (
        <div className="flex justify-center items-center h-screen">
            {routes.map((route) => (
                <ButtonLink key={route.to} to={route.to} label={route.label} />
            ))}
        </div>
    );
};

export default Home;