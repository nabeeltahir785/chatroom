import React, { useState, ChangeEvent } from 'react';
import {authService, loginUser, registerUser} from "../services/api-services/authService";
import Input from "../form/Input";
import Button from "../form/Button";
const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);

        if (!password) {
            setPasswordError('Password is required');
        }

    };
    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
        setUsername(username);

        if (!username) {
            setUsernameError('Username is required');
        }

    };
    const handleLogin = async (event: React.FormEvent) => {
        try {
            if (!username) {
                setUsernameError('Username is required');
                return false;
            }
            if (!password) {
                setPasswordError('Password is required');
                return false;
            }

            event.preventDefault();
                const response = await loginUser({ username, password });
                const token = response.access_token;
                if (token) {
                    localStorage.setItem('token', token);
                }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <Input type="text" value={username} onChange={handleUserNameChange} error={usernameError}/>
            <Input type="password" value={username} onChange={handlePasswordChange} error={passwordError}/>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default Login;
