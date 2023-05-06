import React from "react";
import {Stack} from "expo-router";

const ShareLayout = () => {
    return (
        <Stack>
            <Stack.Screen name={"index"} options={{headerTitle: "Your Shares"}} />
            <Stack.Screen name={"newShare/stepOne"} options={{headerTitle: "Step One"}} />
            <Stack.Screen name={"newShare/stepTwo"} options={{headerTitle: "Step Two"}} />
            <Stack.Screen name={"viewShare"} options={{headerTitle: "Share"}} />
            <Stack.Screen name={"copies"} options={{headerTitle: "Your Copies"}} />
            <Stack.Screen name={"viewCopy"} options={{headerTitle: "Your Copy"}} />
            <Stack.Screen name={"newCopy"} options={{title: "New Copy"}} />
        </Stack>
    );
};

export default ShareLayout;