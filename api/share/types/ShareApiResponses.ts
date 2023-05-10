import type {Copy, Share} from "../../types/ShareTypes";
import ApiResponse from "../../ApiResponse";

export interface CreateShareResponse extends ApiResponse {
    data: {
        share: Share;
    }
}

export interface GetShareResponse extends ApiResponse {
    data: {
        share: Share;
        songCount: number;
        isOwner: boolean;
    }
}

export interface GetSharesResponse extends ApiResponse {
    data: {
        shares: Share[];
    }
}

export interface GetCopyResponse extends ApiResponse {
    data: {
        copy: Copy;
    }
}

export interface GetCopiesResponse extends ApiResponse {
    data: {
        copies: Copy[];
    }
}
