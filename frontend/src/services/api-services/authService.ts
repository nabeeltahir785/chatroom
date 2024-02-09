import { apiManager } from "../api-manager/apiManager";
import {ILoginSuccessResponse} from "@/interfaces/ILoginSuccessResponse";

export const loginService = async (payload): Promise<ILoginSuccessResponse> => {
    const url =   `${process.env.RECT_APP_API_URL}/login`
    const { data } = await apiManager.request(url, payload, "POST");
    return data;
};