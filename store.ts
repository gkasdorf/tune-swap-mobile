import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/user/userSlice";
import authSlice from "./slices/auth/authSlice";
import swapSlice from "./slices/swap/swapSlice";
import syncSlice from "./slices/sync/syncSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        auth: authSlice,
        swap: swapSlice,
        sync: syncSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
