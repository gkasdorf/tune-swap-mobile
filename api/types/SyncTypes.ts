import {Playlist} from "./PlaylistTypes";

export interface Sync {
    user_id: number,
    syncing: boolean,
    id: number,
    from_playlist_id: string,
    to_playlist_id: string
    from_playlist: Playlist,
    to_playlist: Playlist
}