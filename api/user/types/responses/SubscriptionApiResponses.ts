import {Subscription} from "../../../types/SubscriptionTypes";
import ApiResponse from "../../../ApiResponse";

export interface GetSubscriptionResponse extends ApiResponse {
    data: {
        subscription?: Subscription
    }
}