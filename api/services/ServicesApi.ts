import MusicService from "../enums/MusicService";
import SpotifyApi from "./SpotifyApi";
import AppleMusicApi from "./AppleMusicApi";
import TidalApi from "./TidalApi";
import {GetUserPlaylistsResponse} from "./types/GetUserPlaylistsResponse";

class ServicesApi {
    public static getUserPlaylists = async (service: MusicService | string): Promise<GetUserPlaylistsResponse> => {
        switch (service) {
            case MusicService.Spotify: {
                return await SpotifyApi.getUserPlaylists();
            }
            case MusicService.AppleMusic: {
                return await AppleMusicApi.getUserPlaylists();
            }
            case MusicService.Tidal: {
                return await TidalApi.getUserPlaylists();
            }
        }
    };
}

export default ServicesApi;
