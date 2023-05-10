import {createAsyncThunk} from "@reduxjs/toolkit";
import UserApi from "../../api/user/UserApi";
import {setUser} from "../user/userSlice";
import {SignupForm} from "./authSlice";
import {LoginRequest} from "../../api/user/types/requests/UserApiRequests";

export const signup = createAsyncThunk(
    "auth/signup",
    async (data: SignupForm, thunkAPI) => {
        const res = await UserApi.register(data);

        if (!res.success) {
            return thunkAPI.rejectWithValue(res.message);
        }

        //TODO Store Token

        thunkAPI.dispatch(setUser({
            email: res.data.data.email,
            name: res.data.data.name,
            token: res.data.data.api_token
        }));

        return res.data;
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data: LoginRequest, thunkAPI) => {
        const res = await UserApi.login(data);

        if (!res.success) {
            return thunkAPI.rejectWithValue(res.message);
        }

        //TODO Store Token

        thunkAPI.dispatch(setUser({
            email: res.data.data.email,
            name: res.data.data.name,
            token: res.data.data.api_token
        }));

        return res.data;
    }
);

export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (data: { token: string }, thunkAPI) => {
        const res = await UserApi.verify();

        if (!res.success) {
            return thunkAPI.rejectWithValue(res.message);
        }

        thunkAPI.dispatch(setUser({
            email: res.data.user.email,
            name: res.data.user.name,
            token: res.data.user.token
        }));
    }
);