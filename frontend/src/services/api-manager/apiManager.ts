import { axiosInstance } from "./axiosInstance";
import { AxiosResponse } from "axios";

type axiosMethodTypes = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
const getToken = () => localStorage.getItem('token');
export const apiManager = {
    request: async (
        url: string,
        body: unknown,
        method: axiosMethodTypes,
        baseURL = process.env.BASE_URL
    ): Promise<AxiosResponse> => {
        const token = getToken();
        try {
            return axiosInstance({
                method: method,
                url: url,
                data: body,
                baseURL: baseURL,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (e) {
            throw new Error(e as string);
        }
    },
};