import MusicService from "../../enums/MusicService";

export interface CreateShareRequest {
    playlist_service: MusicService|string;
    playlist_id: string;
}
