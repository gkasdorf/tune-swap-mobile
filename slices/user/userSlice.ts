import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";

interface User {
    name: string;
    email: string;
    isAuthed: boolean;
    token: string;
    subscribed: boolean;
}

interface UserState {
    user: User;
}

const initialState: UserState = {
    user: {
        name: "",
        email: "",
        isAuthed: false,
        token: "",
        subscribed: false
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<any>) => {
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
            state.user.isAuthed = true;
            state.user.token = action.payload.token;
            state.user.subscribed = action.payload.subscribed;
        },
        setUserSubscribed: (state: UserState, action: PayloadAction<boolean>) => {
            state.user.subscribed = action.payload;
        },
        clearUser: (state: UserState) => {
            state.user.name = "";
            state.user.email = "";
            state.user.isAuthed = false;
            state.user.token = "";
            state.user.subscribed = false;
        }
    }
});

export const selectUser = (state: RootState) => state.user.user;

export const {setUser, setUserSubscribed, clearUser} = userSlice.actions;
export default userSlice.reducer;