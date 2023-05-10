import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert, DeviceEventEmitter, StyleSheet, View} from "react-native";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Cell, Section, TableView} from "react-native-tableview-simple";
import {useRouter} from "expo-router";
import {appleBlue} from "../../../style";

const TidalScreen = () => {
    const [isAuthed, setIsAuthed] = useState(false);
    const [username, setUsername] = useState("");

    const router = useRouter();

    useEffect(() => {
        loadSettings().then();
    }, []);

    DeviceEventEmitter.addListener("event.tidalAuthEvent", (e) => {
        setIsAuthed(true);
        setUsername(e.username);
    });

    const loadSettings = async () => {
        setIsAuthed(await AsyncStorage.getItem("@hasTidal") === "true");
        setUsername(await AsyncStorage.getItem("@tidalUsername"));
    };

    const onAuthPress = (): void => {
        router.push("/home/settings/TidalAuth");
    };

    const onSignoutPress = async (): Promise<void> => {
        Alert.alert("Sign out", "Are you sure you wish to sign out of Tidal?\n\nYou will be unable to" +
            "transfer music between other services and Tidal until you sign back in.",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Sign out",
                onPress: async () => {
                    setIsAuthed(false);
                    setUsername("");

                    await AsyncStorage.setItem("@hasTidal", "false");
                    await AsyncStorage.setItem("@tidalUsername", "");
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
                    header={"TIDAL ACCOUNT"}
                    footer={"Your credentials will only be transmitted to Tidal. We do not have access to your credentials."}
                >
                    <Cell
                        cellStyle={"RightDetail"}
                        title={"Tidal"}
                        detail={username ?? "Not Linked"}
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

export default TidalScreen;