import React, {useCallback} from "react";
import {useFocusEffect, useRouter} from "expo-router";
import {Alert, Platform, Settings, StyleSheet, View} from "react-native";
import {Button, Text} from "@rneui/themed";
import TrackingPermissions from "../../TrackingPermissions";
import * as AppleAuthentication from "expo-apple-authentication";
import {
    AppleAuthenticationButton,
    AppleAuthenticationButtonStyle,
    AppleAuthenticationButtonType
} from "expo-apple-authentication";
import UserApi from "../../api/user/UserApi";
import {setUser} from "../../slices/user/userSlice";
import {useAppDispatch} from "../../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LandingScreen = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useFocusEffect(useCallback(() => {
        if(Platform.OS === "ios" && Settings.get("email")) {
            Alert.alert("Welcome Back", "In preparation for syncing and support for Android users, we" +
                " have made some changes to the app. As a result, you will need to sign back in to your account. Also," +
                " you will need to re-link your music services.\n\nSorry for the trouble! We hope you'll like what is" +
                " coming soon.");

            Settings.set({email: null});
        }
    }, []));

    const onAppleButtonPress = async (): Promise<void> => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            const name = credential.fullName.givenName;
            const resp = await UserApi.loginWithApple(credential.authorizationCode, name);

            if(!resp.success) {
                console.log("Error");
                Alert.alert("Error", resp.data.message);
                return;
            }

            await AsyncStorage.setItem("@token", resp.data.data.api_token);

            dispatch(setUser({
                email: resp.data.data.email,
                name: resp.data.data.name,
                token: resp.data.data.api_token
            }));

            router.replace("/home/swap");
        } catch(e) {
            console.log(e);
            if(e.code !== "ERR_CANCELED") {
                Alert.alert("Error", "There was an error authenticating with Apple.");
            }
        }
    };

    return (
        <View style={styles.main}>
            <TrackingPermissions />
            <View style={styles.content}>
                <View style={styles.text}>
                    <Text h2>Swaps. Made. Easy.</Text>
                    <Text h4>No limits, no restrictions. Just music.</Text>
                    <Text h4 style={{marginTop: 20}}>Start for free today.</Text>
                </View>
                <View style={styles.buttons}>
                    {
                        Platform.OS === "ios" && (
                            <AppleAuthenticationButton
                                onPress={onAppleButtonPress}
                                buttonType={AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthenticationButtonStyle.BLACK}
                                style={{ width: "100%", height: 44, borderRadius: 10, marginBottom: 8 }}
                            />
                        )
                    }
                    <Button onPress={() => router.push("/landing/signup")}>Sign Up</Button>
                    <Button onPress={() => router.push("/landing/login")}>Have an account?</Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column"
    },

    content: {
        flex: 1,
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginVertical: 20,
        height: "100%"
    },

    text: {
        marginTop: 100
    },

    buttons: {
        height: 100,
        marginBottom: 100
    }
});

export default LandingScreen;