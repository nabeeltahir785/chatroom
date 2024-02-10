import { useState, ChangeEvent } from 'react';

type InitialStateType<T> = T;

interface UseFormReturnType<T> {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    values: T;
    resetFields: () => void;
}

function useForm<T>(initialState: InitialStateType<T>): UseFormReturnType<T> {
    const [values, setValues] = useState<InitialStateType<T>>(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(values => ({ ...values, [name]: value }));
    };

    const resetFields = () => {
        setValues(initialState);
    };

    return { handleChange, values, resetFields };
}

export default useForm;
