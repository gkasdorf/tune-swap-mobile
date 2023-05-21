import SubscriptionType from "../enums/SubscriptionType";

export interface Subscription {
    start_date: string,
    end_date: string,
    subscription_type: SubscriptionType
}