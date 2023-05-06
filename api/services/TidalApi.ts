import Api from "../Api";
import ApiResponse from "../ApiResponse";
import {Platform} from "react-native";

class TidalApi {
    public static getAuthUrl = (): Promise<ApiResponse> => {
        const api = new Api("/v2/tidal/authUrl");

        const data = {
            android: (Platform.OS === "android") ? "true" : "false"
        };

        return api.get(data);
    };

    public static auth = (code: string, codeVerifier: string): Promise<ApiResponse> => {
        const api = new Api("/v2/tidal/auth");

        return api.post({
            code,
            codeVerifier,
            android: (Platform.OS === "android") ? "true" : "false"
        });
    };

    public static getUserPlaylists = (): Promise<ApiResponse> => {
        const api = new Api("/v2/tidal/me/playlists");

        return api.get();
    };
}

export default TidalApi;
