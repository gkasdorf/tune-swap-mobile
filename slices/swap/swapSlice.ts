import Swap from "../../app/home/swap";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";

export interface PlaylistInfo {
    playlistId: string,
    playlistName: string,
    description: string
}

export interface Swap {
    fromService: string;
    toService: string;
    playlist: PlaylistInfo;
}

interface SwapState {
    swap: Swap;
}

const initialState: SwapState = {
    swap: {
        fromService: null,
        toService: null,
        playlist: {
            playlistId: null,
            playlistName: null,
            description: null
        }
    }
};

const swapSlice = createSlice({
    name: "swap",
    initialState,
    reducers: {
        setSwapFrom: (state: SwapState, action: PayloadAction<string>) => {
            state.swap.fromService = action.payload;
        },

        setSwapTo: (state: SwapState, action: PayloadAction<string>) => {
            state.swap.toService = action.payload;
        },

        setSwapPlaylist: (state: SwapState, action: PayloadAction<PlaylistInfo>) => {
            state.swap.playlist = action.payload;
        },

        clearSwap: () => initialState
    }
});

export const selectSwap = (state: RootState) => state.swap.swap;

export const {setSwapFrom, setSwapTo, setSwapPlaylist, clearSwap} = swapSlice.actions;
export default swapSlice.reducer;
