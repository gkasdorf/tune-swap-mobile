interface DefaultResponse {
    success: boolean;
    status: number;
    data: ResponseData;
}

interface ResponseData {
    message?: string;
    success?: boolean;

    [key: string]: string | number | boolean | object | object[] | null;
}

class ApiResponse {
    public status: number = null;
    public data: ResponseData = null;
    public message: string = null;
    public success = false;

    /**
     * @param res DefaultResponse
     */
    constructor(res: DefaultResponse) {
        Object.assign(this, res);

        this.message = this.data.message;
        this.success = (res.success && res.data.success);
    }
}

export default ApiResponse;