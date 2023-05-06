import React, {useCallback, useEffect, useState} from "react";
import {Stack, useFocusEffect, useRouter, useSearchParams} from "expo-router";
import SwapApi from "../../../api/swap/SwapApi";
import {Alert, ScrollView, StyleSheet, View} from "react-native";
import {HeaderBackButton} from "@react-navigation/elements";
import {Button, LinearProgress, Text} from "@rneui/themed";
import StatusIcon, {StatusIconVariant} from "../../../ui/StatusIcon";
import LoadingModal from "../../../ui/LoadingModal";
import SwapStatus from "../../../api/enums/SwapStatus";
import {AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds} from "react-native-google-mobile-ads";
import Constants from "expo-constants";

const bannerAdUnitId = __DEV__ ? TestIds.BANNER : Constants.expoConfig.extra.admobBannerId;
// eslint-disable-next-line no-undef
const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : Constants.expoConfig.extra.admobInterId;

const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
    // TODO Set whether to show personalized ads
    requestNonPersonalizedAdsOnly: false,
    keywords: ["technology", "music", "fashion", "clothing", "games", "social"]
});

const ViewSwapScreen = () => {
    const [swap, setSwap] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [loading, setLoading] = useState(true);

    const [adLoaded, setAdLoaded] = useState(false);

    const {id, isNew} = useSearchParams();
    const router = useRouter();

    let reload = null;
    let unsubscribe = null;

    useEffect(() => {
        return () => {
            if(reload) clearInterval(reload);
            if(unsubscribe) unsubscribe();
        };
    }, []);

    useEffect(() => {
        if(!loading && adLoaded) {
            interstitial.show();
        }
    }, [loading, adLoaded]);

    useFocusEffect(useCallback(() => {
        loadSwap();

        if(isNew) {
            unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
                setAdLoaded(true);
            });

            interstitial.load();
        }
    }, []));

    const loadSwap = async (): Promise<void>  => {
        const res = await SwapApi.get(id);

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setSwap(res.data.swap);
        const percentage = (res.data.swap.songs_found + res.data.swap.songs_not_found) * 100 / res.data.swap.total_songs;
        setPercentage(percentage);
        setLoading(false);

        if(res.data.swap.status !== SwapStatus.COMPLETED && res.data.swap.status !== SwapStatus.ERROR && !reload) {
            reload = setInterval(loadSwap, 3000);
        }

        if((res.data.swap.status === SwapStatus.COMPLETED || res.data.swap.status === SwapStatus.ERROR) && reload) {
            clearInterval(reload);
            reload = null;
        }
    };

    const getStatusVariant = (status: string): StatusIconVariant => {
        switch(status) {
        case SwapStatus.COMPLETED: {
            return "success";
        }
        case SwapStatus.ERROR: {
            return "error";
        }
        default: {
            return "pending";
        }
        }
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
                                        router.replace("/home/swap");
                                    }}
                                />
                            )
                        }}
                    />
                )
            }
            {
                swap && (
                    <View style={styles.statusScreen}>
                        <Text h3 style={{textAlign: "center"}}>{swap.playlist_name}</Text>
                        <Text style={{textAlign: "center"}}>Swap from {swap.from_service} to {swap.to_service}</Text>
                        <View style={styles.status}>
                            <StatusIcon variant={getStatusVariant(swap.status)} />
                            {
                                swap.status !== SwapStatus.COMPLETED && swap.status !== SwapStatus.ERROR && (
                                    <LinearProgress
                                        style={{marginVertical: 10}}
                                        value={percentage / 100}
                                        variant={"determinate"}
                                    />
                                )
                            }
                            <Text style={{marginTop: 10}}>
                                {
                                    swap.status === SwapStatus.COMPLETED && (
                                        "Your swap has finished processing!"
                                    ) || swap.status === SwapStatus.ERROR && (
                                        "There was an error with your swap. Please let us know so we can resolve the issue!"
                                    ) || (
                                        `Status: ${swap.status}`
                                    )
                                }
                            </Text>
                            <View style={styles.swapInfo}>
                                <View>
                                    <Text h4 style={styles.swapInfoHeader}>Total</Text>
                                    <Text style={styles.swapInfoSubtitle}>{swap.total_songs}</Text>
                                </View>
                                <View>
                                    <Text h4>Found</Text>
                                    <Text style={styles.swapInfoSubtitle}>{swap.songs_found}</Text>
                                </View>
                                <View>
                                    <Text h4>Not Found</Text>
                                    <Text style={styles.swapInfoSubtitle}>{swap.songs_not_found}</Text>
                                </View>
                            </View>
                            {
                                swap.status === SwapStatus.COMPLETED && (
                                    <View style={styles.swapButtons}>
                                        <Button>View Original Playlist</Button>
                                        <Button>View New Playlist</Button>
                                    </View>
                                )
                            }
                        </View>
                        {
                            !__DEV__ && (
                                <View style={{alignItems: "center", marginTop: 20}}>
                                    <BannerAd unitId={bannerAdUnitId} size={BannerAdSize.MEDIUM_RECTANGLE} requestOptions={{requestNonPersonalizedAdsOnly: true}}/>
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
        marginBottom: 20,
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
    },

    swapInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30,

        marginTop: 30
    },

    swapInfoHeader: {
        fontWeight: "bold"
    },

    swapInfoSubtitle: {
        fontSize: 18,
        textAlign: "center"
    },

    swapButtons: {
        marginTop: 40,
        width: "100%"
    }
});

export default ViewSwapScreen;