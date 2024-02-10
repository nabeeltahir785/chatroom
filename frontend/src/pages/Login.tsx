import React, {useState} from 'react';
import { loginUser } from "../services/api-services/authService";
import Input from "../form/Input";
import Button from "../form/Button";
import { Link } from "react-router-dom";
import useForm from '../hook/useForm';
import { validateUsername, validatePassword } from '../validations/RegisterValidation';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
const Login = () => {
    const { login } = useAuth();
    const { values, handleChange } = useForm({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const validateForm = () => {
        const usernameError = validateUsername(values.username);
        const passwordError = validatePassword(values.password);
        setErrors({ username: usernameError, password: passwordError });
        return !usernameError && !passwordError;
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await loginUser(values);
            const token = response.access_token;
            if (token) {
                login(token);
                navigate("/chat");
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 w-1/2 p-6">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <Input name="username" type="text" placeholder="username" value={values.username} onChange={handleChange} error={errors.username}/>
                    <Input name="password" type="password"  placeholder="password" value={values.password} onChange={handleChange} error={errors.password}/>
                    <div className="flex space-x-4 mt-4">
                        <Button type="submit" variant="primary">Login</Button>
                        <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
