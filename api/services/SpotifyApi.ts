import ApiResponse from "../ApiResponse";
import Api from "../Api";

export const SPOTIFY_REDIRECT_URL = "tuneswap://home/settings/Spotify";

class SpotifyApi {
    public static getAuthUrl = (): Promise<ApiResponse> => {
        const api = new Api("/v2/spotify/authUrl");

        const data = {
            redirect_uri: SPOTIFY_REDIRECT_URL
        };

        return api.get(data);
    };

    public static doAuth = (code: string): Promise<ApiResponse> => {
        const api = new Api("/v2/spotify/auth");

        const data = {
            code: code,
            redirect_uri: SPOTIFY_REDIRECT_URL
        };

        return api.get(data);
    };

    public static getUserPlaylists = (): Promise<ApiResponse> => {
        const api = new Api("/v2/spotify/me/playlists");

        return api.get();
    };
}

export default SpotifyApi;
