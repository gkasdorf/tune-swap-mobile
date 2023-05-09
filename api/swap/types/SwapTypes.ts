import SwapStatus from "../../enums/SwapStatus";
import MusicService from "../../enums/MusicService";

export interface Swap {
    id: number,
    created_at: string,
    updated_at: string,
    status: SwapStatus,
    user_id: number,
    from_service: MusicService,
    to_service: MusicService,
    playlist_name: string,
    playlist_id?: string,
    from_playlist_id: string,
    from_playlist_url?: string,
    total_songs: number,
    songs_found: number,
    songs_not_found: number,
    will_sync: boolean,
    to_playlist_id: string,
    to_playlist_url?: string,
    description?: string,
}

export interface SwapWithNotFound extends Omit<Swap, "songs_not_found"> {
    songs_not_found: object[]
}