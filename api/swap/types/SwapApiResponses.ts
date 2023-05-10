import SwapStatus from "../../enums/SwapStatus";
import {Swap, SwapWithNotFound} from "../../types/SwapTypes";
import ApiResponse from "../../ApiResponse";

export interface StartSwapResponse extends ApiResponse {
    data: {
        swapId: number,
        swapStatus: SwapStatus
    }
}

export interface GetAllSwapsResponse extends ApiResponse {
    data: {
        total: number,
        swaps: Swap[]
    }
}

export interface GetSwapResponse extends ApiResponse {
    data: {
        swap?: Swap
    }
}

export interface SongsNotFoundResponse extends ApiResponse {
    data: {
        swap?: SwapWithNotFound
    }
}