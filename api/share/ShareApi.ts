import MusicService from "../enums/MusicService";
import Api from "../Api";
import ApiResponse from "../ApiResponse";
import {
    CreateShareResponse,
    GetCopiesResponse,
    GetCopyResponse,
    GetShareResponse,
    GetSharesResponse
} from "./types/ShareApiResponses";
import {CreateShareRequest} from "./types/ShareApiRequests";

class ShareApi {
    public static create = async (data: CreateShareRequest): Promise<CreateShareResponse> => {
        const api = new Api("/v2/share/create");

        return await api.post(data) as CreateShareResponse;
    };

    public static get = async (id: string): Promise<GetShareResponse> => {
        const api = new Api(`/v2/share/${id}`);

        return await api.get() as GetShareResponse;
    };

    public static getAll = async (): Promise<GetSharesResponse> => {
        const api = new Api("/v2/share");

        return await api.get() as GetSharesResponse;
    };

    public static delete = async (id: string): Promise<ApiResponse> => {
        const api = new Api(`/v2/share/${id}/delete`);

        return await api.get() as ApiResponse;
    };

    public static startCopy = async (id: string, service: MusicService): Promise<ApiResponse> => {
        const api = new Api(`/v2/share/${id}/copy`);

        const data = {
            service: service.toString()
        };

        return await api.post(data) as ApiResponse;
    };

    public static getCopy = async (id: string): Promise<GetCopyResponse> => {
        const api = new Api(`/v2/share/copy/${id}`);

        return await api.get() as GetCopyResponse;
    };

    public static getCopies = async (): Promise<GetCopiesResponse> => {
        const api = new Api("/v2/share/copy");

        return await api.get() as GetCopiesResponse;
    };
}

export default ShareApi;