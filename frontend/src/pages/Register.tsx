import React, { useState } from 'react';
import { registerUser } from "../services/api-services/authService";
import { Link } from 'react-router-dom';
import Input from "../form/Input";
import Button from "../form/Button";
import Alert from "../components/alert";
import useForm from '../hook/useForm'; // Assuming useForm is in the same directory
import { validateEmail, validatePassword, validateUsername } from '../validations/RegisterValidation';

const Register = () => {
    const { values, handleChange, resetFields } = useForm({ email: '', username: '', password: '' });
    const [errors, setErrors] = useState({ email: '', username: '', password: '' });
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');


    const validateForm = () => {
        const emailError = validateEmail(values.email);
        const usernameError = validateUsername(values.username);
        const passwordError = validatePassword(values.password);
        setErrors({ email: emailError, username: usernameError, password: passwordError });
        return !emailError && !usernameError && !passwordError;
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) return;
        try {
            await registerUser(values);
            resetFields();
            setAlertMessage("Success! Your account has been registered.");
            setAlertType("success");
        } catch (error) {
            console.error('Registration failed:', error);
            setAlertMessage("Error! Something went wrong while registering your account.");
            setAlertType("error");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 w-1/2 p-6">
                <h2 className="mb-4">Register</h2>
                <Alert message={alertMessage} type={alertType} />
                <form onSubmit={handleRegister}>
                    <Input name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} error={errors.email}/>
                    <Input name="username" type="text" placeholder="Username" value={values.username} onChange={handleChange} error={errors.username}/>
                    <Input name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} error={errors.password}/>
                    <div className="flex space-x-4 mt-4">
                        <Button type="submit" variant="primary">Register</Button>
                        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
