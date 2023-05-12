import React, {useCallback, useEffect, useState} from "react";
import {Stack, useFocusEffect, useRouter, useSearchParams} from "expo-router";
import {Button, LinearProgress, Text} from "@rneui/themed";
import {Alert, Linking, Platform, ScrollView, StyleSheet, View} from "react-native";
import ShareApi from "../../../api/share/ShareApi";
import LoadingModal from "../../../ui/LoadingModal";
import StatusIcon, {StatusIconVariant} from "../../../ui/StatusIcon";
import SwapStatus from "../../../api/enums/SwapStatus";
import {HeaderBackButton} from "@react-navigation/elements";
import {AdEventType, InterstitialAd, TestIds} from "react-native-google-mobile-ads";
import Constants from "expo-constants";
import {useAppSelector} from "../../../hooks";
import {selectUser} from "../../../slices/user/userSlice";

// eslint-disable-next-line no-undef
const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : Constants.expoConfig.extra.admobInterId;

const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["technology", "music", "fashion", "clothing", "games", "social"]
});

const ViewShareScreen = () => {
    const [copy, setCopy] = useState(null);
    const [loading, setLoading] = useState(true);

    const [adLoaded, setAdLoaded] = useState(false);

    const {subscribed} = useAppSelector(selectUser);

    const {id, isNew} = useSearchParams();
    const router = useRouter();

    let reload = null;
    let unsubscribe = null;

    useEffect(() => {
        return () => {
            if (reload) clearInterval(reload);
            if (unsubscribe) unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!loading && adLoaded) {
            interstitial.show().then();
        }
    }, [loading, adLoaded]);

    useFocusEffect(useCallback(() => {
        loadCopy().then();

        if (isNew && !subscribed) {
            unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
                setAdLoaded(true);
            });

            interstitial.load();
        }
    }, []));

    const loadCopy = async () => {
        const res = await ShareApi.getCopy(id.toString());

        if (!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        if (res.data.copy.status !== SwapStatus.COMPLETED && res.data.copy.status !== SwapStatus.ERROR && !reload) {
            reload = setInterval(loadCopy, 5000);
        }

        if ((res.data.copy.status === SwapStatus.COMPLETED || res.data.copy.status === SwapStatus.ERROR) && reload) {
            clearInterval(reload);
            reload = null;
        }

        setCopy(res.data.copy);
        setLoading(false);
    };

    const getStatusVariant = (status: SwapStatus): StatusIconVariant => {
        switch (status) {
            case SwapStatus.COMPLETED:
                return "success";
            case SwapStatus.ERROR:
                return "error";
            default:
                return "pending";
        }
    };

    const onOpenPress = async (): Promise<void> => {
        await Linking.openURL(copy.service_url);
    };

    return (
        <ScrollView style={styles.main}>
            {
                isNew && (
                    <Stack.Screen
                        options={{
                            gestureEnabled: false,
                            headerLeft: () => (
                                <HeaderBackButton onPress={() => router.push("/home/share")} label={"Back"} labelVisible={Platform.OS === "ios"}/>
                            )
                        }}
                    />
                )
            }
            {
                copy && (
                    <View style={styles.statusScreen}>
                        <Text h3 style={{textAlign: "center"}}>{copy.share.playlist.name}</Text>
                        <Text style={{textAlign: "center"}}>Playlist by {copy.share.playlist.user.name}</Text>
                        <View style={styles.status}>
                            <StatusIcon variant={getStatusVariant(copy.status)}/>

                            {
                                copy.status === SwapStatus.ERROR && (
                                    <Text style={{marginTop: 10}}>There was an error creating the playlist. Please try again
                                        later.</Text>
                                ) || copy.status === SwapStatus.COMPLETED && (
                                    <Text style={{marginTop: 10}}>Your playlist has been created!</Text>
                                ) || (
                                    <>
                                        <Text style={{marginTop: 10}}>We are creating your playlist. Please wait...</Text>
                                        <LinearProgress style={{marginTop: 10}} value={copy.progress}/>
                                    </>
                                )
                            }
                        </View>
                        {
                            copy.status === SwapStatus.COMPLETED && (
                                <View style={styles.shareButtons}>
                                    <Button onPress={onOpenPress}>Open in {copy.service}</Button>
                                </View>
                            )
                        }
                    </View>
                )
            }
            <LoadingModal loading={loading}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10
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