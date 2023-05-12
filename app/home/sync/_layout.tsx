import React from "react";
import {Stack, useRouter} from "expo-router";
import {Button} from "react-native";

const SyncLayout = () => {
    const router = useRouter();

    return (
        <Stack>
            <Stack.Screen
                name={"index"}
                options={{
                    title: "Syncs",
                    headerRight: () => {
                        return (
                            <Button
                                title={"New Sync"}
                                onPress={() => {
                                    router.push("/home/sync/newSync/stepOne");
                                }}
                            />
                        );
                    }
                }}
            />
            <Stack.Screen name={"viewSync"} options={{title: "Sync"}} />
        </Stack>
    );
};

export default SyncLayout;