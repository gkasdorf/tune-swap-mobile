import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert, StyleSheet, View} from "react-native";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Cell, Section, TableView} from "react-native-tableview-simple";
import * as WebBrowser from "expo-web-browser";
import {WebBrowserResultType} from "expo-web-browser";
import Constants from "expo-constants";
import {useAppSelector} from "../../../hooks";
import {selectUser} from "../../../slices/user/userSlice";
import {appleBlue} from "../../../style";

const API_URL = Constants.expoConfig.extra.apiUrl;
const APP_URL = "tuneswap://home/settings/AppleMusic";

const AppleMusicScreen = () => {
    const [isAuthed, setIsAuthed] = useState(false);

    const user = useAppSelector(selectUser);

    useEffect(() => {
        loadSettings().then();
    }, []);

    const loadSettings = async () => {
        setIsAuthed(await AsyncStorage.getItem("@hasAppleMusic") === "true");
    };

    const onAuthPress = async (): Promise<void> => {
        const url = API_URL + "/applemusic/authPage?apiToken=" + encodeURIComponent(user.token);

        const amRes = await WebBrowser.openAuthSessionAsync(url, APP_URL, {
            preferEphemeralSession: !__DEV__
        });

        if (amRes.type === WebBrowserResultType.CANCEL) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const success = amRes.url.split("?success=")[1] === "true";

        if (!success) {
            Alert.alert("Error", "There was an error linking your Apple Music account.");
            return;
        }

        setIsAuthed(true);

        await AsyncStorage.setItem("@hasAppleMusic", "true");
    };

    const onSignoutPress = async (): Promise<void> => {
        Alert.alert("Sign out", "Are you sure you wish to sign out of Apple Music?\n\nYou will be unable to" +
            "transfer music between other services and Apple Music until you sign back in.",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Sign out",
                onPress: async () => {
                    setIsAuthed(false);

                    await AsyncStorage.setItem("@hasAppleMusic", "false");
                },
                isPreferred: true
            }
        ]);
    };

    return (
        <View style={styles.main}>
            <TableView style={styles.table}>
                <Section
                    roundedCorners={true}
                    hideSurroundingSeparators={true}
                    header={"APPLE MUSIC ACCOUNT"}
                    footer={"Your credentials will only be transmitted to Apple. We do not have access to your credentials."}
                >
                    <Cell
                        cellStyle={"RightDetail"}
                        title={"Apple Music"}
                        detail={isAuthed ? "Linked" : "Not Linked"}
                    />
                    <Cell
                        cellStyle={"Basic"}
                        title={isAuthed ? "Sign Out" : "Link Account"}
                        accessory={"DisclosureIndicator"}
                        titleTextColor={isAuthed ? "red" : appleBlue}
                        onPress={() => {
                            if (isAuthed) {
                                onSignoutPress().then();
                            } else {
                                onAuthPress().then();
                            }
                        }}
                    />
                </Section>
            </TableView>
        </View>
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

export default AppleMusicScreen;