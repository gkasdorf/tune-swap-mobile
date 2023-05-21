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
            <Stack.Screen name={"newSync/stepOne"} options={{title: "New Sync"}} />
            <Stack.Screen name={"newSync/stepTwo"} options={{title: "New Sync"}} />
            <Stack.Screen name={"newSync/stepThree"} options={{title: "New Sync"}} />
            <Stack.Screen name={"newSync/stepFour"} options={{title: "New Sync"}} />
        </Stack>
    );
};

export default SyncLayout;