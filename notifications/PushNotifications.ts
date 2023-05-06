import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationsApi from "../api/user/NotificationsApi";
import {Platform} from "react-native";

export const handlers = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false
            };
        }
    });
};

export const register = async () => {
    let token;

    if(Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if(existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if(finalStatus !== "granted") {
            console.log("Not granted.");

            await AsyncStorage.setItem("@notificationsEnabled", "false");
            return;
        }

        token = (await Notifications.getDevicePushTokenAsync()).data;
        console.log("Got the token", token);

        if(await AsyncStorage.getItem("@deviceToken") === token) {
            console.log("Already set, we don't need to do anything.");
            return;
        }

        await AsyncStorage.setItem("@deviceToken", token);
        await AsyncStorage.setItem("@notificationsEnabled", "true");

        await NotificationsApi.enableNotifications(token);
    } else {
        console.log("Not a real device.");
    }

    if(Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.DEFAULT,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
};