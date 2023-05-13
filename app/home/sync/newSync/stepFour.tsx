import React, {useState} from "react";
import {selectSync, setSyncFromId} from "../../../../slices/sync/syncSlice";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {useRouter} from "expo-router";
import {Alert, StyleSheet, View} from "react-native";
import LoadingModal from "../../../../ui/LoadingModal";
import {Text} from "@rneui/themed";
import PlaylistsList from "../../../../ui/components/PlaylistsList";
import SyncApi from "../../../../api/sync/SyncApi";
import {CreateSyncRequest} from "../../../../api/sync/types/SyncApiRequests";

const SyncStepTwoScreen = () => {
    const [loading, setLoading] = useState(true);

    const sync = useAppSelector(selectSync);

    const router = useRouter();

    const onPlaylistPress = async (id: string) => {
        setLoading(true);

        const res = await SyncApi.create({
            fromService: sync.fromService,
            fromId: sync.fromId,
            toService: sync.toService,
            toId: id
        } as CreateSyncRequest);

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setLoading(false);
        router.push({pathname: "/home/sync/viewSync", params: {id: res.data.sync.id.toString()}});
    };

    return (
        <View style={styles.main}>
            <LoadingModal loading={loading}/>
            <View style={{padding: 20}}>
                <Text style={{textAlign: "center"}}>
                    Now, select the second playlist you want to sync...
                </Text>
            </View>
            <PlaylistsList service={sync.toService} setLoading={setLoading} onPlaylistPress={onPlaylistPress}/>
        </View>
    );

};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default SyncStepTwoScreen;