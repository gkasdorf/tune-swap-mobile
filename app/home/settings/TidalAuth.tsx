import React, {useEffect, useState} from "react";
import TidalApi from "../../../api/services/TidalApi";
import {Alert, DeviceEventEmitter, Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
import WebView from "react-native-webview";

const TidalAuth = () => {
    const [url, setUrl] = useState("");
    const [authData, setAuthData] = useState({codeVerifier: ""});
    let didAuth = false;

    const router = useRouter();

    useEffect(() => {
        getAuthData().then();
    }, []);

    const getAuthData = async () => {
        const authDataResp = await TidalApi.getAuthUrl();
        setUrl(authDataResp.data.url.url);

        setAuthData(authDataResp.data.url);
    };

    const doAuth = async (code) => {
        const res = await TidalApi.auth(code, authData.codeVerifier);

        if (!res.success) {
            Alert.alert("Error", res.message);
            return;
        }

        await AsyncStorage.setItem("@hasTidal", "true");
        await AsyncStorage.setItem("@tidalUsername", res.data.username);

        DeviceEventEmitter.emit("event.tidalAuthEvent", {username: res.data.username});

        router.back();
    };

    const stateChange = (e): void => {
        const url = (Platform.OS === "android") ? "https://tidal.com/android/login/auth" : "https://listen.tidal.com/login/auth";

        if (e.url.toString().includes(url)) {
            const code = e.url.split("code=")[1].split("&state=")[0];

            if (!didAuth) {
                doAuth(code).then();
                didAuth = true;
            }
        }
    };

    return (
        <WebView
            source={{uri: url}}
            onNavigationStateChange={stateChange}
            userAgent={""}
        />
    );
};

export default TidalAuth;