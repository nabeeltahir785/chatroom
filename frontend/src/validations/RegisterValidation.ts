export const validateEmail = (email: string): string => {
    if (!email) {
        return 'Email is required';
    }
    return '';
};

export const validatePassword = (password: string): string => {
    if (!password) {
        return 'Password is required';
    }
    return '';
};

export const validateUsername = (username: string): string => {
    if (!username) {
        return 'Username is required';
    }
    return '';
};
