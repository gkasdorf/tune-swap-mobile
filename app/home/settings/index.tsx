import React, {useEffect} from "react";
import {Alert, Linking, ScrollView, StyleSheet} from "react-native";
import {Text} from "@rneui/themed";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Cell, Section, TableView} from "react-native-tableview-simple";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {clearUser, selectUser} from "../../../slices/user/userSlice";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserApi from "../../../api/user/UserApi";
import * as PushNotifications from "../../../notifications/PushNotifications";

import {
    getApplicationName,
    getDeviceName,
    getFirstInstallTime,
    getModel,
    getReadableVersion,
    getSystemName,
    getSystemVersion
} from "react-native-device-info";
import Constants from "expo-constants";

const SettingsScreen = () => {
    const user = useAppSelector(selectUser);

    const router = useRouter();
    const dispatch = useAppDispatch();

    // DEBUG VARIABLES
    const baseUrl: string = Constants.expoConfig.extra.apiUrl;


    useEffect(() => {
        PushNotifications.register().then();
    }, []);

    const onSignoutPress = async (): Promise<void> => {
        dispatch(clearUser());
        await AsyncStorage.multiRemove([
            "@hasSpotify",
            "@spotifyEmail",
            "@hasAppleMusic",
            "@hasTidal",
            "@tidalUsername",
            "@token"
        ]);

        router.replace("/landing");
    };

    const onDeletePress = async (): Promise<void> => {
        Alert.alert("Delete Account?", "Are you sure you want to delete your TuneSwap account?", [
            {
                text: "Cancel",
                isPreferred: true,
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    const res = await UserApi.delete();

                    if(!res.success) {
                        Alert.alert("Error", res.message);
                        return;
                    }

                    await onSignoutPress();
                }
            }
        ]);
    };

    const onReportBugPress = async (): Promise<void> => {
        const debugInfo = {
            applicationName: getApplicationName(),
            deviceName: await getDeviceName(),
            installed: await getFirstInstallTime(),
            model: getModel(),
            version: getReadableVersion(),
            systemName: getSystemName(),
            systemVersion: getSystemVersion(),
            email: user.email
        };

        const message = "Thanks for submitting a bug report!\r\n\r\nPlease describe the issue you are having:" +
            " \r\n\r\nWhat is the expected result?\r\n\r\nWhat can we do to reproduce the issue?\r\n\r\n" +
            "We respond to all emails we receive, so we will be back with you very soon!\r\n\r\n This is " +
            "some information that will help us analyze the issue. You may remove it if you want, but we" +
            " may ask you for this information if necessary.\r\n\r\n";

        const subject = encodeURIComponent(`TuneSwap ${getReadableVersion()} Bug Report (iOS)`);

        const url = "mailto:support@tuneswap.app?subject=" + subject + "&body=" + encodeURIComponent(message) + encodeURIComponent(JSON.stringify(debugInfo));

        Linking.openURL(url).then(() => null).catch(() => null);
    };

    return (
        <ScrollView style={styles.main}>
            <TableView style={styles.table}>
                <Section
                    header={"SERVICES"}
                    roundedCorners={true}
                    hideSurroundingSeparators={true}
                    footer={"Connect each of the service you use and want to share or swap with."}
                >
                    <Cell
                        title={"Spotify"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => router.push("home/settings/Spotify")}
                    />
                    <Cell
                        title={"Apple Music"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => router.push("home/settings/AppleMusic")}
                    />
                    <Cell
                        title={"Tidal"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => router.push("/home/settings/Tidal")}
                    />
                </Section>

                <Section
                    roundedCorners={true}
                    hideSurroundingSeparators={true}
                    header={"ACCOUNT"}
                >
                    <Cell
                        cellStyle={"RightDetail"}
                        title={"Name"}
                        detail={user.name}
                    />
                    <Cell
                        cellStyle={"RightDetail"}
                        title={"Email"}
                        detail={user.email}
                    />
                    <Cell
                        title={"Notifications"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => router.push("home/settings/Notifications")}
                    />
                    <Cell
                        title={"Sign Out"}
                        accessory={"DisclosureIndicator"}
                        onPress={onSignoutPress}
                    />
                    <Cell
                        title={"Delete Account"}
                        accessory={"DisclosureIndicator"}
                        onPress={onDeletePress}
                    />
                </Section>
                <Section
                    roundedCorners={true}
                    hideSurroundingSeparators={true}
                    header={"ABOUT"}
                >
                    <Cell
                        title={"Report a Bug"}
                        accessory={"DisclosureIndicator"}
                        onPress={onReportBugPress}
                    />
                    <Cell
                        title={"Support"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => { Linking.openURL("mailto:support@tuneswap.app").then(); }}
                    />
                    <Cell
                        title={"Privacy Policy"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => { Linking.openURL("https://tuneswap.app/privacy").then(); }}
                    />
                    <Cell
                        title={"License"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => {router.push("/home/settings/licenses"); }}
                    />
                    <Cell
                        title={"GitHub"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => { Linking.openURL("https://github.com/gkasdorf/tune-swap-mobile").then(); }}
                    />
                    <Cell
                        title={"Trello"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => { Linking.openURL("https://trello.com/b/dOEkVxW7/tuneswap").then(); }}
                    />
                </Section>

                {
                    __DEV__ && (
                        <Section
                            roundedCorners={true}
                            hideSurroundingSeparators={true}
                            header={"DEBUG"}
                        >
                            <Cell
                                title={"API URL"}
                                cellStyle={"RightDetail"}
                                detail={baseUrl}
                            />
                            <Cell
                                title={"Token"}
                                cellStyle={"RightDetail"}
                                detail={user.token}
                            />
                            <Cell
                                title={"Do It"}
                                accessory={"DisclosureIndicator"}
                                onPress={async () => {
                                    console.log("Running DOIT");

                                    await AsyncStorage.removeItem("@deviceToken");
                                }}
                            />
                        </Section>
                    )
                }
            </TableView>
            <Text style={{textAlign: "center", marginBottom: 20}}>
                v{getReadableVersion()} - Made with ❤️
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },

    table: {
        marginHorizontal: 15,
    },
});

export default SettingsScreen;