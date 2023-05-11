import Api from "../Api";
import {GetSubscriptionResponse} from "./types/responses/SubscriptionApiResponses";

class SubscriptionApi {
    public static getSubscription = async (): Promise<GetSubscriptionResponse> => {
        const api = new Api("/v2/user/subscription");

        return await api.get() as GetSubscriptionResponse;
    };
}

export default SubscriptionApi;