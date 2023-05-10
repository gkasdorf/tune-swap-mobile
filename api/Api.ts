import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Api {
    static baseUrl: string = Constants.expoConfig.extra.apiUrl;

    private readonly options: { headers: object };
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

        if (token) {
            this.options.headers["Authorization"] = `Bearer ${token}`;
        }
    };

    public post = async (data: object): Promise<object> => {
        await this.setToken();

        try {
            const res = await axios.post(this.url, data, this.options);

            return {
                success: true,
                status: res.status,
                data: res.data
            };
        } catch (e) {
            return {
                success: false,
                status: e.response.status,
                data: e.response.data
            };
        }
    };

    public get = async (data?: { [key: string]: string }): Promise<object> => {
        await this.setToken();

        let url: string;

        if (data) {
            const query: string = new URLSearchParams(data).toString();
            url = `${this.url}?${query}`;
        } else {
            url = this.url;
        }

        try {
            const res = await axios.get(url, this.options);

            return {
                success: true,
                status: res.status,
                data: res.data
            };
        } catch (e) {
            return {
                success: false,
                status: e.response.status,
                data: e.response.data
            };
        }
    };
}

export default Api;