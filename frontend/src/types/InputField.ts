import {ChangeEvent} from "react";

export type InputFieldProps = {
    name: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
};


