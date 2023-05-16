import React, {useState} from "react";
import {selectSync, setSyncFromId} from "../../../../slices/sync/syncSlice";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {useRouter} from "expo-router";
import {StyleSheet, View} from "react-native";
import LoadingModal from "../../../../ui/LoadingModal";
import {Text} from "@rneui/themed";
import PlaylistsList from "../../../../ui/components/PlaylistsList";

const SyncStepTwoScreen = () => {
    const [loading, setLoading] = useState(true);

    const {fromService} = useAppSelector(selectSync);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const onPlaylistPress = async (id: string) => {
        dispatch(setSyncFromId(id));

        router.push("/home/sync/newSync/stepThree");
    };

    return (
        <View style={styles.main}>
            <LoadingModal loading={loading}/>
            <View style={{padding: 20}}>
                <Text style={{textAlign: "center"}}>
                    Now, select the playlist you want to sync...
                </Text>
            </View>
            <PlaylistsList service={fromService} setLoading={setLoading} onPlaylistPress={onPlaylistPress}/>
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