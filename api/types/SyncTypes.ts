import {Playlist} from "./PlaylistTypes";

export interface Sync {
    user_id: number,
    syncing: boolean,
    id: number,
    last_checked: string,
    last_synced: string,
    from_playlist_id: string,
    to_playlist_id: string,
    from_total: number,
    to_total: number,
    from_playlist?: Playlist,
    to_playlist?: Playlist
}