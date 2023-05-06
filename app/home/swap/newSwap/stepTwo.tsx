import React, {useState} from "react";
import {useRouter} from "expo-router";
import {StyleSheet, View} from "react-native";
import LoadingModal from "../../../../ui/LoadingModal";
import {Text} from "@rneui/themed";
import PlaylistsList from "../../../../ui/components/PlaylistsList";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {PlaylistInfo, selectSwap, setSwapPlaylist} from "../../../../slices/swap/swapSlice";

const SwapStepTwoScreen = () => {
    const [loading, setLoading] = useState(true);

    const {fromService} = useAppSelector(selectSwap);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const onPlaylistPress = async(id: string, name: string) => {
        const playlistInfo = {
            playlistId: id,
            playlistName: name,
            description: null
        } as PlaylistInfo;

        dispatch(setSwapPlaylist(playlistInfo));

        router.push("/home/swap/newSwap/stepThree");
    };

    return (
        <View style={styles.main}>
            <LoadingModal loading={loading} />
            <View style={{padding: 20}}>
                <Text style={{textAlign: "center"}}>
                    Now, select the playlist you want to swap...
                </Text>
            </View>
            <PlaylistsList service={fromService} setLoading={setLoading} onPlaylistPress={onPlaylistPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default SwapStepTwoScreen;