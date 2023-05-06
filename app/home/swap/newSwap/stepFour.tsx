import React, {useCallback, useState} from "react";
import {useAppSelector} from "../../../../hooks";
import {selectSwap} from "../../../../slices/swap/swapSlice";
import {useFocusEffect, useRouter} from "expo-router";
import {Alert, StyleSheet, View} from "react-native";
import {Button, Text} from "@rneui/themed";
import Input from "../../../../ui/Input";
import SwapApi from "../../../../api/swap/SwapApi";
import LoadingModal from "../../../../ui/LoadingModal";

const SwapStepFourScreen = () => {
    const [description, setDescription] = useState("Transferred with TuneSwap");
    const [playlistName, setPlaylistName] = useState("");

    const [loading, setLoading] = useState(false);

    const swap = useAppSelector(selectSwap);

    const router = useRouter();

    useFocusEffect(useCallback(() => {
        setPlaylistName(swap.playlist.playlistName);
    }, []));

    const onStartSwapPress = async () => {
        setLoading(true);

        const res = await SwapApi.start({
            from_service: swap.fromService,
            to_service: swap.toService,
            playlist_name: playlistName,
            from_playlist_id: swap.playlist.playlistId,
            description: description
        });

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setLoading(false);
        router.push({pathname: "/home/swap/viewSwap", params: {id: res.data.swapId, isNew: "true"}});
    };

    return (
        <View style={styles.main}>
            <LoadingModal loading={loading} />
            <Text h4 style={{textAlign: "center"}}>
                Just a few more things...
            </Text>
            <View style={styles.form}>
                <Input
                    label={"Playlist Name"}
                    placeholder={"House Party!"}
                    onChangeText={text => setPlaylistName(text)}
                    autoCorrect={false}
                    value={playlistName}
                    clearButtonMode={"while-editing"}
                />
                <Input
                    label={"Playlist Description"}
                    placeholder={"Best playlist ever"}
                    onChangeText={text => setDescription(text)}
                    value={description}
                    clearButtonMode={"while-editing"}
                />
                <Button style={{marginTop: 20}} onPress={onStartSwapPress}>Start Swap</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",

        paddingTop: 20,
        paddingHorizontal: 20
    },

    form: {
        marginTop: 10
    }
});

export default SwapStepFourScreen;