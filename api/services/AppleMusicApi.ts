import Api from "../Api";
import {GetUserPlaylistsResponse} from "./types/GetUserPlaylistsResponse";

class AppleMusicApi {
    static getUserPlaylists = async (): Promise<GetUserPlaylistsResponse> => {
        const api = new Api("/v2/applemusic/me/playlists");

        return await api.get() as GetUserPlaylistsResponse;
    };
}

export default AppleMusicApi;
