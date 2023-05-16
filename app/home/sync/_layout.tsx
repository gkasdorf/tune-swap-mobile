import React from "react";
import {Stack} from "expo-router";

const SyncLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name={"index"}
                options={{
                    title: "Syncs",
                }}
            />
            <Stack.Screen name={"viewSync"} options={{title: "Sync"}} />
        </Stack>
    );
};

export default SyncLayout;