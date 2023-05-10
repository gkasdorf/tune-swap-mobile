import Api from "../Api";
import ApiResponse from "../ApiResponse";
import {Platform} from "react-native";

class TidalApi {
    public static getAuthUrl = async (): Promise<ApiResponse> => {
        const api = new Api("/v2/tidal/authUrl");

        const data = {
            android: (Platform.OS === "android") ? "true" : "false"
        };

        return await api.get(data) as ApiResponse;
    };

    public static auth = async (code: string, codeVerifier: string): Promise<ApiResponse> => {
        const api = new Api("/v2/tidal/auth");

        return await api.post({
            code,
            codeVerifier,
            android: (Platform.OS === "android") ? "true" : "false"
        }) as ApiResponse;
    };

    public static getUserPlaylists = async (): Promise<ApiResponse> => {
        const api = new Api("/v2/tidal/me/playlists");

        return await api.get() as ApiResponse;
    };
}

export default TidalApi;
