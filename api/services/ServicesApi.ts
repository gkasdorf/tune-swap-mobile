import ApiResponse from "../ApiResponse";
import MusicService from "../enums/MusicService";
import SpotifyApi from "./SpotifyApi";
import AppleMusicApi from "./AppleMusicApi";

class ServicesApi {
    public static getUserPlaylists = async(service: MusicService): Promise<ApiResponse> => {
        switch(service) {
        case MusicService.Spotify: {
            return await SpotifyApi.getUserPlaylists();
        }
        case MusicService.AppleMusic: {
            return await AppleMusicApi.getUserPlaylists();
        }
        case MusicService.Tidal: {
            return await AppleMusicApi.getUserPlaylists();
        }
        }
    };
}

export default ServicesApi;
