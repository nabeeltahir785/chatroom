import { apiManager } from "../api-manager/apiManager";
export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    notifications: any[];
    __v: number;
}

export const findAllUsersExceptLoggedIn = async (): Promise<IUser[]> => {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    const { data } = await apiManager.request(url, null, "GET");
    return data;
};
