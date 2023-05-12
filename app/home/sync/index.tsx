import React, {useCallback, useState} from "react";
import {useFocusEffect, useRouter} from "expo-router";
import syncApi from "../../../api/sync/SyncApi";
import {Alert, FlatList, StyleSheet, View} from "react-native";
import {ListItem} from "@rneui/themed";
import LoadingModal from "../../../ui/LoadingModal";
import {ListItemChevron} from "@rneui/base/dist/ListItem/ListItem.Chevron";

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

    return (
        <View style={styles.main}>
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