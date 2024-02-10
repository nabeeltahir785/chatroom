import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'info' | 'danger';
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
    return (
        <button
            className={`button ${variant}`}
            {...props}
        />
    );
};

export default Button;
