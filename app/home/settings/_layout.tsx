import React from "react";
import {Stack} from "expo-router";

const SettingsLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name={"index"}
                options={{
                    title: "Settings"
                }}
            />
            <Stack.Screen name={"TidalAuth"} options={{title: "Tidal Authentication"}}/>
            <Stack.Screen name={"licenses"} options={{title: "Licenses"}}/>
            <Stack.Screen name={"subscription"} options={{title: "Your Subscription"}}/>
        </Stack>
    );
};

export default SettingsLayout;