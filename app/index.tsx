import React, {useEffect} from "react";
import {SplashScreen, useLocalSearchParams, useRootNavigationState, useRouter, useSearchParams} from "expo-router";
import {useAppDispatch, useAppSelector} from "../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loadUser} from "../slices/auth/authActions";

const Home = () => {
    const {error, loading, success} = useAppSelector(state => state.auth);

    const router = useRouter();
    const navigationState = useRootNavigationState();
    const dispatch = useAppDispatch();

    const {redirect, data} = useLocalSearchParams();

    useEffect(() => {
        if (!navigationState?.key) {
            return;
        }

        console.log(redirect, data);

        load().then();
    }, [navigationState?.key]);

    useEffect(() => {
        if (error) {
            router.replace("/landing/login");
        } else if (success) {
            if(redirect) {
                router.replace({pathname: "/home/share/newCopy", params: {id: data}});
                return;
            }

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