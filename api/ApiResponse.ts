class ApiResponse {
    public reqSuccess = false;
    public status: number = null;
    public data: any = null;
    public message: string = null;
    public success = false;


    constructor(res: {success: boolean, status: number, data: {message?: string, success: boolean}}) {
        this.reqSuccess = res.success;
        this.status = res.status;
        this.data = res.data;
        this.message = res.data.message;
        this.success = (res.success && res.data.success);
    }

    public isError = (): boolean => {
        const first: string = String(this.status).charAt(0);
        return first === "5";
    };

    public isFail = (): boolean => {
        const first: string = String(this.status).charAt(0);
        return first === "4";
    };
}

export default ApiResponse;