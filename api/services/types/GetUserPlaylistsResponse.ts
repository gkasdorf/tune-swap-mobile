import ApiResponse from "../../ApiResponse";

export interface GetUserPlaylistsResponse extends ApiResponse {
    data: {
        playlists: object[];
    }
}