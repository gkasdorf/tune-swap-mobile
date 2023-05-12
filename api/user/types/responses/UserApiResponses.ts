import ApiResponse from "../../../ApiResponse";

export interface LoginResponse extends ApiResponse {
    data: {
        data: {
            name: string,
            email: string,
            api_token: string,
            subscribed: boolean
        }
    }
}

export interface SignupResponse extends ApiResponse {
    data: {
        data: {
            name: string,
            email: string,
            api_token: string,
            subscribed: boolean
        }
    }
}

export interface VerifyResponse extends ApiResponse {
    data: {
        user: {
            name: string,
            email: string,
            token: string,
            subscribed: boolean
        }
    }
}

export interface IsRunningResponse extends ApiResponse {
    data: {
        running: boolean
    }
}
