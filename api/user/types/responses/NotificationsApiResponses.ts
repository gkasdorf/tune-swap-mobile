import ApiResponse from "../../../ApiResponse";

export interface EnableNotificationsResponse extends ApiResponse {
    data: {
        message: string;
        success: boolean;
    }
}

export interface DisableNotificationsResponse extends ApiResponse {
    data: {
        message: string;
        success: boolean;
    }
}
