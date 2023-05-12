import ApiResponse from "../../ApiResponse";
import {Sync} from "../../types/SyncTypes";

export interface CreateSyncResponse extends ApiResponse {
    data: {
        sync: string
    }
}

export interface GetAllSyncsResponse extends ApiResponse {
    data: {
        syncs: Sync[]
    }
}

export interface GetSyncResponse extends ApiResponse {
    data: {
        sync: Sync
    }
}