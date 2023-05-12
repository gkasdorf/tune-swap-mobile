import React from "react";
import {Stack} from "expo-router";

const SyncLayout = () => {
    return (
        <Stack>
            <Stack.Screen name={"index"} options={{title: "Syncs"}} />
        </Stack>
    );
};

export default SyncLayout;