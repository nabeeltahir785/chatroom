import { apiManager } from "../api-manager/apiManager";
interface IRegisterApiResponse  {
        username: string;
        email: string;
        notifications: any[];
        _id: string;
}

interface ILoginApiResponse {
    access_token: string;
}

export const registerUser = async (payload: { email: string; username: string; password: string }): Promise<IRegisterApiResponse> => {
    const url = `${process.env.REACT_APP_API_URL}/auth/register`;
    const { data } = await apiManager.request(url, payload, "POST");
    return data;
};
export const loginUser = async (payload: { username: string; password: string }): Promise<ILoginApiResponse> => {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    const { data } = await apiManager.request(url, payload, "POST");
    return data;
};