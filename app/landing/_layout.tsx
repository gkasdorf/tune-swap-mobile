import React from "react";
import {Stack} from "expo-router";

const LandingLayout = () => {
    return (
        <Stack screenOptions={{
        }}>
            <Stack.Screen name={"index"} options={{title: "Welcome"}} />
            <Stack.Screen name={"signup"} options={{title: "Signup"}} />
            <Stack.Screen name={"login"} options={{title: "Login"}} />
        </Stack>
    );
};

export default LandingLayout;