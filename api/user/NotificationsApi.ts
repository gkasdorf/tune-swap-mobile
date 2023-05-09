import Api from "../Api";
import {Platform} from "react-native";
import {DisableNotificationsResponse, EnableNotificationsResponse} from "./types/responses/NotificationsApiResponses";

class NotificationsApi {
    public static enableNotifications = async (deviceId: string): Promise<EnableNotificationsResponse> => {
        let url: string;

        if(Platform.OS === "ios") {
            url = "/v2/user/notifications/ios/enable";
        } else {
            url = "/v2/user/notifications/android/enable";
        }

        const api = new Api(url);

        const data = {
            token: deviceId
        };

        return await api.get(data) as EnableNotificationsResponse;
    };

    public static disableNotifications = async (deviceId: string): Promise<DisableNotificationsResponse> => {
        let url: string;

        if(Platform.OS === "ios") {
            url = "/v2/user/notifications/ios/disable";
        } else {
            url = "/v2/user/notifications/android/disable";
        }

        const api = new Api(url);

        const data = {
            token: deviceId
        };

        return await api.get(data) as DisableNotificationsResponse;
    };
}

export default NotificationsApi;
