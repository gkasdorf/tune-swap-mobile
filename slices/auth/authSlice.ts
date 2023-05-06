import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadUser, login, signup} from "./authActions";

export interface SignupForm {
    name: string,
    email: string,
    password: string,
    passwordAgain: string
}

interface AuthState {
    loading: boolean;
    userAuthed: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
    userAuthed: false,
    error: null,
    success: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth: (state: AuthState) => {
            state.loading = false;
            state.userAuthed = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state: AuthState) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(signup.fulfilled, (state: AuthState) => {
            state.loading = false;
            state.userAuthed = true;
            state.error = null;
            state.success = true;
        });

        builder.addCase(signup.rejected, (state: AuthState, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(login.pending, (state: AuthState) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(login.fulfilled, (state: AuthState) => {
            state.loading = false;
            state.userAuthed = true;
            state.error = null;
            state.success = true;
        });

        builder.addCase(login.rejected, (state: AuthState, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(loadUser.pending, (state: AuthState) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(loadUser.fulfilled, (state: AuthState) => {
            state.loading = false;
            state.userAuthed = true;
            state.error = null;
            state.success = true;
        });

        builder.addCase(loadUser.rejected, (state: AuthState, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

const {reducer, actions} = authSlice;

export const {clearAuth} = actions;
export default reducer;