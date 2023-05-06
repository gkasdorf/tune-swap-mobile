import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";

interface User {
    name: string;
    email: string;
    isAuthed: boolean;
    token: string
}

interface UserState {
    user: User;
}

const initialState: UserState = {
    user: {
        name: "",
        email: "",
        isAuthed: false,
        token: ""
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
        },
        clearUser: (state: UserState) => {
            state.user.name = "";
            state.user.email = "";
            state.user.isAuthed = false;
            state.user.token = "";
        }
    }
});

export const selectUser = (state: RootState) => state.user.user;

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;