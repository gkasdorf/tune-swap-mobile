import React, {useCallback, useState} from "react";
import ShareApi from "../../../api/share/ShareApi";
import {Stack, useFocusEffect, useRouter, useSearchParams} from "expo-router";
import {Alert, Platform, StyleSheet, View} from "react-native";
import MusicService from "../../../api/enums/MusicService";
import {Divider, Text} from "@rneui/themed";
import LoadingModal from "../../../ui/LoadingModal";
import {HeaderBackButton} from "@react-navigation/elements";
import ServicesList from "../../../ui/components/ServicesList";

const NewCopyScreen = () => {
    const [share, setShare] = useState(null);
    const [loading, setLoading] = useState(true);

    const {id} = useSearchParams();
    const router = useRouter();

    useFocusEffect(useCallback(() => {
        loadShare();
    }, [id]));

    const loadShare = async () => {
        const res = await ShareApi.get(id.toString());

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setShare(res.data.share);
        setLoading(false);
    };

    const onServicePress = async (service: MusicService): Promise<void> => {
        setLoading(true);

        const res = await ShareApi.startCopy(share.access_id, service);

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setLoading(false);
        router.push({pathname: "/home/share/viewCopy", params: {id: res.data.copy.id, isNew: true}});
    };

    return (
        <View style={styles.main}>
            <Stack.Screen options={{
                headerLeft: () => (
                    <HeaderBackButton
                        onPress={() => router.replace("/home/share")}
                        label={"Back"}
                        labelVisible={Platform.OS === "ios"}
                    />
                )
            }} />
            {
                share && (
                    <View style={styles.screen}>
                        <View>
                            <Text h3 style={{textAlign: "center"}}>{share.playlist.name}</Text>
                            <Text style={{textAlign: "center"}}>Playlist by {share.playlist.user.name}</Text>
                        </View>
                        <Divider style={{marginVertical: 20}}/>
                        <View style={{marginTop: 10}}>
                            <Text h4 style={{textAlign: "center"}}>Where to?</Text>
                            <ServicesList onServicePress={onServicePress} />
                        </View>
                    </View>
                )
            }
            <LoadingModal loading={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10
    },

    screen: {
        flex: 1,

        backgroundColor: "white",

        margin: 10,
        padding: 20,

        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },

    status: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30
    },

    shareButtons: {
        marginTop: 40
    }
});

export default NewCopyScreen;