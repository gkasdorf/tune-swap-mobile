import Api from "../Api";
import {GetSubscriptionResponse} from "./types/responses/SubscriptionApiResponses";
import ApiResponse from "../ApiResponse";
import {VerifyReceiptAndroidRequest} from "./types/requests/SubscriptionApiRequests";

class SubscriptionApi {
    public static getSubscription = async (): Promise<GetSubscriptionResponse> => {
        const api = new Api("/v2/user/subscription");

        return await api.get() as GetSubscriptionResponse;
    };

    public static verifyReceiptIos = async (receipt): Promise<ApiResponse> => {
        const api = new Api("/v2/user/subscription/verify/apple");

        const data = {
            receipt: receipt
        };

        return await api.post(data) as ApiResponse;
    };

    public static verifyReceiptAndroid = async (data: VerifyReceiptAndroidRequest): Promise<ApiResponse> => {
        const api = new Api("/v2/user/subscription/verify/android");

        return await api.post(data) as ApiResponse;
    };
}

export default SubscriptionApi;