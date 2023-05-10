export interface LoginRequest {
    email: string;
    password: string;
}

export interface AppleLoginRequest {
    code: string;
    name?: string | null;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    passwordAgain: string;
}