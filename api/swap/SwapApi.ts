import Api from "../Api";
import ApiResponse from "../ApiResponse";

export type SwapData = {
    from_service: string,
    to_service: string,
    from_playlist_id: string,
    playlist_name: string,
    description: string
};

class SwapApi {
    public static start = (swap: SwapData): Promise<ApiResponse> => {
        const api = new Api("/v2/swap/start");

        return api.post(swap);
    };

    public static getAll = async (): Promise<object[]> => {
        const api = new Api("/v2/swap");

        const data = {
            limit: "100",
            offset: "0"
        };

        const res = await api.get(data);

        const swaps = [];
        let count = 0;
        let total = 0;

        res.data.swaps.forEach((item) => {
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

    public static get = (id): Promise<ApiResponse> => {
        const api = new Api(`/v2/swap/${id}`);

        return api.get();
    };

    public static getNotFound = (id): Promise<ApiResponse> => {
        const api = new Api(`/v2/swap/${id}/notfound`);

        return api.get();
    };
}

export default SwapApi;