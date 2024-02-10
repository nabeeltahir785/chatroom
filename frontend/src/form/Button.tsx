import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'info' | 'danger';
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
    return (
        <button
            className={`button ${variant} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"`}
            {...props}
        />
    );
};

export default Button;
