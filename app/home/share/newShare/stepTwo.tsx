import React, {useState} from "react";
import {Alert, StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";
import {useRouter, useSearchParams} from "expo-router";
import PlaylistsList from "../../../../ui/components/PlaylistsList";
import LoadingModal from "../../../../ui/LoadingModal";
import ShareApi from "../../../../api/share/ShareApi";
import PropTypes from "prop-types";

const ShareStepTwoScreen = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {service} = useSearchParams();

    const onPlaylistPress = async (id: string) => {
        setLoading(true);

        const res = await ShareApi.create({
            playlist_service: service.toString(),
            playlist_id: id
        });

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setLoading(false);
        router.push({pathname: "/home/share/viewShare", params: {id: res.data.share.access_id, isNew: "true"}});
    };

    return (
        <View style={styles.main}>
            <LoadingModal loading={loading} />
            <View style={{padding: 20}}>
                <Text style={{textAlign: "center"}}>
                    Now, select the playlist you want to share...
                </Text>
            </View>
            <PlaylistsList service={service?.toString() ?? null} setLoading={setLoading} onPlaylistPress={onPlaylistPress} />
        </View>
    );
};

ShareStepTwoScreen.propTypes = {
    service: PropTypes.string
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default ShareStepTwoScreen;