import React from "react";
import {SplashScreen, Stack} from "expo-router";
import {Provider} from "react-redux";
import store from "../store";
import {ThemeProvider} from "@rneui/themed";
import theme from "../theme";
import {useFonts} from "expo-font";
import * as PushNotifications from "../notifications/PushNotifications";
import {withIAPContext} from "react-native-iap";

PushNotifications.handlers();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        "OpenSans": require("../assets/fonts/OpenSans.ttf"),
        "OpenSans_bold": require("../assets/fonts/OpenSans_bold.ttf")
    });

    if (!fontsLoaded) {
        return <SplashScreen/>;
    }

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Stack
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name={"index"} options={{title: "Home"}}/>
                </Stack>
            </ThemeProvider>
        </Provider>
    );
};

export default withIAPContext(Layout);