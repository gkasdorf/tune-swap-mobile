import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {useRootNavigationState, useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loadUser} from "../slices/auth/authActions";

const ProtectedRoute = ({children}) => {

    const {error, loading, success} = useAppSelector(state => state.auth);

    const router = useRouter();
    const navigationState = useRootNavigationState();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!navigationState?.key) {
            return;
        }

        load();
    }, [navigationState?.key]);

    useEffect(() => {
        if(error && !loading) {
            router.replace("/login");
        }
    }, [error, loading, success]);

    const load = async () => {
        const token = await AsyncStorage.getItem("@token");

        if(!token) {
            router.replace("landing/Login");
            return;
        }

        dispatch(loadUser({token}));
    };

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.any
};

export default ProtectedRoute;