import ApiResponse from "../ApiResponse";
import Api from "../Api";

export const SPOTIFY_REDIRECT_URL = "tuneswap://home/settings/Spotify";

class SpotifyApi {
    public static getAuthUrl = async (): Promise<ApiResponse> => {
        const api = new Api("/v2/spotify/authUrl");

        const data = {
            redirect_uri: SPOTIFY_REDIRECT_URL
        };

        return await api.get(data) as ApiResponse;
    };

    public static doAuth = async (code: string): Promise<ApiResponse> => {
        const api = new Api("/v2/spotify/auth");

        const data = {
            code: code,
            redirect_uri: SPOTIFY_REDIRECT_URL
        };

        return await api.get(data) as ApiResponse;
    };

    public static getUserPlaylists = async (): Promise<ApiResponse> => {
        const api = new Api("/v2/spotify/me/playlists");

        return await api.get() as ApiResponse;
    };
}

export default SpotifyApi;
