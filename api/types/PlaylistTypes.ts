import MusicService from "../enums/MusicService";

export interface Playlist {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    name: string;
    swaps: number;
    service: MusicService;
    service_id: string;

    user?: {
        id: number;
        name: string;
    }
}