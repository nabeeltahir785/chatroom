import React, { FC } from 'react';

interface AlertProps {
    message: string | null;
    type: 'success' | 'error';
}

const Alert: FC<AlertProps> = ({ message, type }) => {
    if (!message) return null;
    const alertColor = type === 'success' ? 'bg-green-200 border-green-500 text-green-700' : 'bg-red-200 border-red-500 text-red-700';

    return (
        <div className={`${alertColor} px-4 py-3 rounded relative`} role="alert">
            <strong className="font-bold">{message}</strong>
        </div>
    );
}

export default Alert;
