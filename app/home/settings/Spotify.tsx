import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert, StyleSheet, View} from "react-native";
import {Cell, Section, TableView} from "react-native-tableview-simple";
import SpotifyApi, {SPOTIFY_REDIRECT_URL} from "../../../api/services/SpotifyApi";
import * as WebBrowser from "expo-web-browser";
import {WebBrowserResultType} from "expo-web-browser";
import {appleBlue} from "../../../style";

const SpotifyScreen = () => {
    const [isAuthed, setIsAuthed] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setIsAuthed(await AsyncStorage.getItem("@hasSpotify") === "true");
        setEmail(await AsyncStorage.getItem("@spotifyEmail"));
    };

    const onAuthPress = async (): Promise<void> => {
        const res = await SpotifyApi.getAuthUrl();

        if (!res.success) {
            Alert.alert("Error", res.message);
            return;
        }

        const spotifyResult = await WebBrowser.openAuthSessionAsync(res.data.url, SPOTIFY_REDIRECT_URL, {
            preferEphemeralSession: !__DEV__
        });

        if (spotifyResult.type === WebBrowserResultType.CANCEL) {
            return;
        }

        const spotifyToken = spotifyResult?.url.split("code=")[1].split("&state")[0];
        const authRes = await SpotifyApi.doAuth(spotifyToken);

        if (!authRes.success) {
            Alert.alert("Error", authRes.message);
            return;
        }

        setIsAuthed(true);
        setEmail(authRes.data.email);

        await AsyncStorage.setItem("@hasSpotify", "true");
        await AsyncStorage.setItem("@spotifyEmail", authRes.data.email);
    };

    const onSignoutPress = async (): Promise<void> => {
        Alert.alert("Sign out", "Are you sure you wish to sign out of Spotify?\n\nYou will be unable to" +
            "transfer music between other services and Spotify until you sign back in.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Sign out",
                    onPress: async () => {
                        setIsAuthed(false);
                        setEmail("");

                        await AsyncStorage.setItem("@hasSpotify", "false");
                        await AsyncStorage.setItem("@spotifyEmail", "");
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
                    header={"SPOTIFY ACCOUNT"}
                    footer={"Your credentials will only be transmitted to Spotify. We do not have access to your credentials."}
                >
                    <Cell
                        cellStyle={"RightDetail"}
                        title={"Spotify"}
                        detail={email ?? "Not Linked"}
                    />
                    <Cell
                        cellStyle={"Basic"}
                        title={isAuthed ? "Sign Out" : "Link Account"}
                        accessory={"DisclosureIndicator"}
                        titleTextColor={isAuthed ? "red" : appleBlue}
                        onPress={() => {
                            if (isAuthed) {
                                onSignoutPress();
                            } else {
                                onAuthPress();
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

export default SpotifyScreen;