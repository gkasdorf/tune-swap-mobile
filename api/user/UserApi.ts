import ApiResponse from "../ApiResponse";
import Api from "../Api";

class UserApi {
    /**
     * Sends a login request
     * @param email
     * @param password
     */
    public static login = (email: string, password: string): Promise<ApiResponse> => {
        const api: Api = new Api("/v2/user/login");

        const data = {
            email: email,
            password: password
        };

        return api.post(data);
    };

    /**
     * Sends a login with apple request
     * @param code
     * @param name
     */
    public static loginWithApple = (code: string, name: string = null): Promise<ApiResponse> => {
        const api: Api = new Api("/v2/user/login/apple");

        return api.post({code, name});
    };

    /**
     * Sends the register user request
     * @param data
     */
    public static register = (data: {name: string, email: string, password: string, passwordAgain: string}): Promise<ApiResponse> => {
        const api: Api = new Api("/v2/user/signup");

        return api.post(data);
    };

    /**
     * Verify the current user token is valid
     */
    public static verify = async (): Promise<ApiResponse> => {
        const api: Api = new Api("/v2/user/verify");

        const res: ApiResponse = await api.get();

        if(res.status === 401) {
            this.signOut();
            return;
        }

        return res;
    };

    private static signOut = () => {
        // Do the sign out
    };

    /**
     * Sends a delete user request
     */
    public static delete = (): Promise<ApiResponse> => {
        const api: Api = new Api("/v2/user/delete");

        const data = {};

        return api.post(data);
    };

    public static isRunning = (): Promise<ApiResponse> => {
        const api: Api = new Api("/v2/user/running");

        return api.get();
    };

    public static enableNotifications = (deviceId: string): Promise<ApiResponse> => {
        const api: Api = new Api("/v2/user/notifications/ios/enable");

        const data = {
            token: deviceId,
        };

        return api.get(data);
    };

    public static disableNotifications = (deviceId: string): Promise<ApiResponse> => {
        const api: Api = new Api("/v2/user/notifications/ios/disable");

        const data = {
            token: deviceId
        };

        return api.get(data);
    };
}

export default UserApi;