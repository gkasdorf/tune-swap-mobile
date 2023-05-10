import React, {useEffect} from "react";
import {SplashScreen, useRootNavigationState, useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loadUser} from "../slices/auth/authActions";

const Home = () => {
    const {error, loading, success} = useAppSelector(state => state.auth);

    const router = useRouter();
    const navigationState = useRootNavigationState();
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("Here we are.");

        if (!navigationState?.key) {
            return;
        }

        load();
    }, [navigationState?.key]);

    useEffect(() => {

        // if(error && !loading) {
        //     router.replace("landing/login");
        // } else if(success) {
        //     router.replace("/home/swap");
        // }

        if (error) {
            router.replace("/landing/login");
        } else if (success) {
            router.replace("/home/swap");
        }
    }, [error, loading, success]);

    const load = async () => {
        const token = await AsyncStorage.getItem("@token");

        if (!token) {
            router.replace("landing");
            return;
        }

        dispatch(loadUser({token}));
    };

    if (!success && !error) {
        return <SplashScreen/>;
    }

    return (
        <>

        </>
    );
};

export default Home;