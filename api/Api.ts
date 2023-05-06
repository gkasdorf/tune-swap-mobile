import Constants from "expo-constants";
import ApiResponse from "./ApiResponse";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Api {
    static baseUrl: string = Constants.expoConfig.extra.apiUrl;

    private readonly options: {headers: object};
    private readonly url: string;

    constructor(url: string) {
        const headers: object = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        };

        this.options = {
            headers: headers
        };

        this.url = `${Api.baseUrl}${url}`;
    }

    private setToken = async (): Promise<void> => {
        const token = await AsyncStorage.getItem("@token");

        if(token) {
            this.options.headers["Authorization"] = `Bearer ${token}`;
        }
    };

    public post = async (data: object): Promise<ApiResponse> => {
        await this.setToken();

        try {
            const res = await axios.post(this.url, data, this.options);

            return new ApiResponse({
                success: true,
                status: res.status,
                data: res.data
            });
        } catch(e) {
            return new ApiResponse({
                success: false,
                status: e.response.status,
                data: e.response.data
            });
        }
    };

    public get = async(data?: { [key: string]: string }): Promise<ApiResponse> => {
        await this.setToken();

        let url: string;

        if(data) {
            const query: string = new URLSearchParams(data).toString();
            url = `${this.url}?${query}`;
        } else {
            url = this.url;
        }

        try {
            const res = await axios.get(url, this.options);

            return new ApiResponse({
                success: true,
                status: res.status,
                data: res.data
            });
        } catch(e) {
            return new ApiResponse({
                success: false,
                status: e.response.status,
                data: e.response.data
            });
        }
    };
}

export default Api;