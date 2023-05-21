import React, {useCallback, useState} from "react";
import {Stack, useFocusEffect, useRouter} from "expo-router";
import syncApi from "../../../api/sync/SyncApi";
import {Alert, Button, FlatList, StyleSheet, View} from "react-native";
import {ListItem} from "@rneui/themed";
import LoadingModal from "../../../ui/LoadingModal";
import {ListItemChevron} from "@rneui/base/dist/ListItem/ListItem.Chevron";
import UserApi from "../../../api/user/UserApi";
import {GetActiveSyncsResponse} from "../../../api/user/types/responses/UserApiResponses";

const SyncsScreen = () => {
    const [syncs, setSyncs] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useFocusEffect(useCallback(() => {
        loadSyncs().then();
    },[]));

    const loadSyncs = async () => {
        const res = await syncApi.getAll();

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setSyncs(res.data.syncs);
        setLoading(false);
    };

    const syncItem = (obj) => {
        const sync = obj.item;

        return (
            <ListItem
                bottomDivider
                onPress={() => {
                    router.push({pathname: "/home/sync/viewSync", params: {id: sync.id}});
                }}
            >
                <ListItem.Content>
                    <ListItem.Title>
                        {
                            sync.from_playlist_id === null ? (
                                "Sync getting ready..."
                            ) : (
                                `${sync.from_playlist.name} and ${sync.to_playlist.name}`
                            )
                        }
                    </ListItem.Title>
                </ListItem.Content>
                <ListItemChevron />
            </ListItem>
        );
    };

    const onNewSyncPress = async (): Promise<void> => {
        setLoading(true);
        const res: GetActiveSyncsResponse = await UserApi.getActiveSyncCount();
        setLoading(false);

        if(!res.success) {
            Alert.alert("Error", res.message);
            return;
        }

        const allowedTotal = __DEV__ ? 1 : 3;

        if(res.data.total >= allowedTotal && !res.data.isTurbo) {
            Alert.alert("Too Many Syncs", "You may only have up to three active syncs.\n\nTurbo users may" +
                " have unlimited active syncs. If you would like to upgrade, press the button below. Otherwise, disable" +
                " one of your active syncs before continuing.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Upgrade",
                    onPress: () => {
                        router.push("/home/settings/subscription");
                    },
                    style: "default"
                }
            ]);

            return;
        }

        router.push("/home/sync/newSync/stepOne");
    };

    return (
        <View style={styles.main}>
            <Stack.Screen
                options={{
                    headerRight: () => {
                        return (
                            <Button
                                title={"New Sync"}
                                onPress={onNewSyncPress}
                            />
                        );
                    }
                }}
            />

            <LoadingModal loading={loading}/>

            <FlatList
                data={syncs}
                extraData={syncs}
                renderItem={syncItem}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                windowSize={10}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default SyncsScreen;