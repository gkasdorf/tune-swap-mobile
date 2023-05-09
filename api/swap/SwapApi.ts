import Api from "../Api";
import ApiResponse from "../ApiResponse";
import {StartSwapRequest} from "./types/SwapApiRequests";
import {GetAllSwapsResponse, GetSwapResponse, SongsNotFoundResponse, StartSwapResponse} from "./types/SwapApiResponses";
import {Swap} from "./types/SwapTypes";

class SwapApi {
    public static start = async (data: StartSwapRequest): Promise<StartSwapResponse> => {
        const api = new Api("/v2/swap/start");

        return await api.post(data) as StartSwapResponse;
    };

    public static getAll = async (): Promise<object[]> => {
        const api = new Api("/v2/swap");

        const data = {
            limit: "100",
            offset: "0"
        };

        const res = await api.get(data) as GetAllSwapsResponse;

        const swaps = [];
        let count = 0;
        let total = 0;

        res.data.swaps.forEach((item: Swap) => {
            if(count % 4 === 0) {
                swaps.push({key: total, type: "ad"});
                total++;
            }

            swaps.push({key: total, ...item});

            total++;
            count++;
        });

        return swaps;
    };

    public static get = async (id): Promise<GetSwapResponse> => {
        const api = new Api(`/v2/swap/${id}`);

        return await api.get() as GetSwapResponse;
    };

    public static getNotFound = async (id): Promise<SongsNotFoundResponse> => {
        const api = new Api(`/v2/swap/${id}/notfound`);

        return await api.get() as SongsNotFoundResponse;
    };
}

export default SwapApi;