import MusicService from "../enums/MusicService";
import Api from "../Api";
import ApiResponse from "../ApiResponse";

class ShareApi {
    public static create = (service: string, id: string): Promise<ApiResponse> => {
        const api = new Api("/v2/share/create");

        const data = {
            playlist_service: service.toString(),
            playlist_id: id
        };

        return api.post(data);
    };

    public static get = (id: string): Promise<ApiResponse> => {
        const api = new Api(`/v2/share/${id}`);

        return api.get();
    };

    public static getAll = (): Promise<ApiResponse> => {
        const api = new Api("/v2/share");

        return api.get();
    };

    public static delete = (id: string): Promise<ApiResponse> => {
        const api = new Api(`/v2/share/${id}/delete`);

        return api.get();
    };

    public static startCopy = (id: string, service: MusicService): Promise<ApiResponse> => {
        const api = new Api(`/v2/share/${id}/copy`);

        const data = {
            service: service.toString()
        };

        return api.post(data);
    };

    public static getCopy = (id: string): Promise<ApiResponse> => {
        const api = new Api(`/v2/share/copy/${id}`);

        return api.get();
    };

    public static getCopies = (): Promise<ApiResponse> => {
        const api = new Api("/v2/share/copy");

        return api.get();
    };
}

export default ShareApi;