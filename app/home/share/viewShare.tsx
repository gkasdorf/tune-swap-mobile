import React, {useCallback, useEffect, useState} from "react";
import {Stack, useFocusEffect, useRouter, useSearchParams} from "expo-router";
import {Button, Text} from "@rneui/themed";
import {Alert, ScrollView, Share, StyleSheet, View} from "react-native";
import ShareApi from "../../../api/share/ShareApi";
import LoadingModal from "../../../ui/LoadingModal";
import StatusIcon, {StatusIconVariant} from "../../../ui/StatusIcon";
import * as Clipboard from "expo-clipboard";
import {HeaderBackButton} from "@react-navigation/elements";

const ViewShareScreen = () => {
    const [share, setShare] = useState(null);
    const [loading, setLoading] = useState(true);

    const [copyButtonText, setCopyButtonText] = useState("Copy Link");

    const {id, isNew} = useSearchParams();
    const router = useRouter();

    let reload = null;

    useEffect(() => {
        return () => {
            if(reload) clearInterval(reload);
        };
    }, []);

    useFocusEffect(useCallback(() => {
        loadShare();
    }, []));

    const loadShare = async () => {
        const res = await ShareApi.get(id.toString());

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        if(!res.data.share.ready && !reload) {
            reload = setInterval(loadShare, 5000);
        }

        if(res.data.share.ready && reload) {
            clearInterval(reload);
            reload = null;
        }

        setShare(res.data.share);
        setLoading(false);
    };

    const getStatusVariant = (status: boolean): StatusIconVariant => {
        if(status) {
            return "success";
        } else {
            return "pending";
        }
    };

    const onCopyLinkPress = async (): Promise<void> => {
        await Clipboard.setStringAsync(`https://tuneswap.app/share/${share.access_id}`);

        setCopyButtonText("Copied!");

        setTimeout(() => {
            setCopyButtonText("Copy Link");
        }, 3000);
    };

    const onSharePress = async (): Promise<void> => {
        await Share.share({
            message: `Check out my playlist ${share.playlist.name}!`,
            url: `https://tuneswap.app/share/${share.access_id}`
        });
    };

    return (
        <ScrollView style={styles.main}>
            {
                isNew && (
                    <Stack.Screen
                        options={{
                            gestureEnabled: false,
                            headerLeft: () => (
                                <HeaderBackButton
                                    onPress={() => {
                                        router.replace("/home/share");
                                    }}
                                />
                            )
                        }}
                    />
                )
            }
            {
                share && (
                    <View style={styles.statusScreen}>
                        <Text h3 style={{textAlign: "center"}}>{share.playlist.name}</Text>
                        <Text style={{textAlign: "center"}}>Playlist from {share.playlist.service}</Text>
                        <View style={styles.status}>
                            <StatusIcon variant={getStatusVariant(share.ready)} />
                            <Text style={{marginTop: 10}}>
                                {
                                    share.ready ? "Your share is ready!" : "We are getting your share ready. Please wait..."
                                }
                            </Text>
                        </View>
                        {
                            share.ready && (
                                <View style={styles.shareButtons}>
                                    <Button onPress={onCopyLinkPress}>{copyButtonText}</Button>
                                    <Button onPress={onSharePress}>Share</Button>
                                </View>
                            )
                        }
                    </View>
                )
            }
            <LoadingModal loading={loading} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10,
    },

    statusScreen: {
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

export default ViewShareScreen;