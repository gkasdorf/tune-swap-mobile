import {CreateSyncRequest} from "../../api/sync/types/SyncApiRequests";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import MusicService from "../../api/enums/MusicService";
import {RootState} from "../../store";

interface SyncState {
    sync: CreateSyncRequest
}

const initialState: SyncState = {
    sync: {
        fromService: null,
        fromId: null,
        toService: null,
        toId: null
    }
};

const syncSlice = createSlice({
    name: "sync",
    initialState,
    reducers: {
        setSyncFromService: (state: SyncState, action: PayloadAction<MusicService>) => {
            state.sync.fromService = action.payload;
        },

        setSyncFromId: (state: SyncState, action: PayloadAction<string>) => {
            state.sync.fromId = action.payload;
        },

        setSyncToService: (state: SyncState, action: PayloadAction<MusicService>) => {
            state.sync.toService = action.payload;
        },

        setSyncToId: (state: SyncState, action: PayloadAction<string>) => {
            state.sync.toId = action.payload;
        },

        clearSync: () => initialState
    }
});

export const selectSync = (state: RootState) => state.sync.sync;

export const {
    setSyncFromService,
    setSyncToService,
    setSyncFromId,
    setSyncToId,
    clearSync
} = syncSlice.actions;

export default syncSlice.reducer;