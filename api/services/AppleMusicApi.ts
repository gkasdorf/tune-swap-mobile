import Api from "../Api";
import ApiResponse from "../ApiResponse";

class AppleMusicApi {
    static getUserPlaylists = async (): Promise<ApiResponse> => {
        const api = new Api("/v2/applemusic/me/playlists");

        return await api.get() as ApiResponse;
    };
}

export default AppleMusicApi;
