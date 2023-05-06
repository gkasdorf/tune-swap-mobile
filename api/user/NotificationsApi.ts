import ApiResponse from "../ApiResponse";
import Api from "../Api";
import {Platform} from "react-native";

class NotificationsApi {
    public static enableNotifications = (deviceId: string): Promise<ApiResponse> => {
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

        return api.get(data);
    };

    public static disableNotifications = (deviceId: string): Promise<ApiResponse> => {
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

        return api.get(data);
    };
}

export default NotificationsApi;
