import {Playlist} from "./PlaylistTypes";
import MusicService from "../enums/MusicService";
import SwapStatus from "../enums/SwapStatus";

export interface Share {
    id: number;
    created_at: string;
    updated_at: string;
    access_id: string;
    user_id: number;
    playlist_id: number;
    saves: number;
    ready: boolean;

    playlist: Playlist;
}

export interface Copy {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    share_id: number;
    service: MusicService;
    status: SwapStatus;
    progress: number;
    service_url: string;

    share?: Share;
}