import ApiResponse from "../../ApiResponse";
import {Sync} from "../../types/SyncTypes";
import SubscriptionType from "../../enums/SubscriptionType";

export interface CreateSyncResponse extends ApiResponse {
    data: {
        sync: Sync
    }
}

export interface GetAllSyncsResponse extends ApiResponse {
    data: {
        syncs: Sync[]
    }
}

export interface GetSyncResponse extends ApiResponse {
    data: {
        sync: Sync,
        subscription?: SubscriptionType,
        nextCheck: string
    }
}