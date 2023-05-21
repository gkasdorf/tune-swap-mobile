import {CreateSyncRequest} from "./types/SyncApiRequests";
import {CreateSyncResponse, GetAllSyncsResponse, GetSyncResponse} from "./types/SyncApiResponses";
import Api from "../Api";

class SyncApi {
    public static create = async (data: CreateSyncRequest): Promise<CreateSyncResponse> => {
        const api = new Api("/v2/sync/create");

        return await api.post(data) as CreateSyncResponse;
    };

    public static getAll = async (): Promise<GetAllSyncsResponse> => {
        const api = new Api("/v2/sync");

        return await api.get() as GetAllSyncsResponse;
    };

    public static get = async(id: string): Promise<GetSyncResponse> => {
        const api = new Api(`/v2/sync/${id}`);

        return await api.get() as GetSyncResponse;
    };

    public static setSyncing = async (id: string): Promise<GetSyncResponse> => {
        const api = new Api(`/v2/sync/${id}/syncing`);

        return await api.get() as GetSyncResponse;
    };
}

export default SyncApi;