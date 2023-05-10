import ApiResponse from "../ApiResponse";
import Api from "../Api";
import {IsRunningResponse, LoginResponse, SignupResponse, VerifyResponse} from "./types/responses/UserApiResponses";
import {AppleLoginRequest, LoginRequest, SignupRequest} from "./types/requests/UserApiRequests";

class UserApi {
    /**
     * Sends a login request
     * @param data {LoginRequest}
     */
    public static login = async (data: LoginRequest): Promise<LoginResponse> => {
        const api: Api = new Api("/v2/user/login");

        return await api.post(data) as LoginResponse;
    };

    /**
     * Sends a login with apple request
     * @param data {AppleLoginRequest}
     */
    public static loginWithApple = async (data: AppleLoginRequest): Promise<LoginResponse> => {
        const api: Api = new Api("/v2/user/login/apple");

        return await api.post(data) as LoginResponse;
    };

    /**
     * Sends the register user request
     * @param data {SignupRequest}
     */
    public static register = async (data: SignupRequest): Promise<SignupResponse> => {
        const api: Api = new Api("/v2/user/signup");

        return await api.post(data) as SignupResponse;
    };

    /**
     * Verify the current user token is valid
     */
    public static verify = async (): Promise<VerifyResponse> => {
        const api: Api = new Api("/v2/user/verify");

        const res: VerifyResponse = await api.get() as VerifyResponse;

        if (res.status === 401) {
            this.signOut();
            return;
        }

        return res;
    };

    private static signOut = () => {
        //TODO
    };

    /**
     * Sends a delete user request
     */
    public static delete = async (): Promise<ApiResponse> => {
        const api: Api = new Api("/v2/user/delete");

        const data = {};

        return await api.post(data) as ApiResponse;
    };

    public static isRunning = async (): Promise<IsRunningResponse> => {
        const api: Api = new Api("/v2/user/running");

        return await api.get() as IsRunningResponse;
    };
}

export default UserApi;