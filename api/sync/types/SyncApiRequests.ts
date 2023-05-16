import MusicService from "../../enums/MusicService";

export interface CreateSyncRequest {
    fromService: MusicService,
    fromId: string,
    toService: MusicService,
    toId: string
}