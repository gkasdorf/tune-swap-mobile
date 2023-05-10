import React, {useCallback, useState} from "react";
import {Stack, useFocusEffect, useRouter} from "expo-router";
import {FlatList, RefreshControl, StyleSheet, View} from "react-native";
import LoadingModal from "../../../ui/LoadingModal";
import {ListItem, Text} from "@rneui/themed";
import {has} from "../../../helpers/Has";
import SwapApi from "../../../api/swap/SwapApi";
import NewSwapButton from "../../../ui/components/NewSwapButton";
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";
import Constants from "expo-constants";

const bannerAdUnitId = __DEV__ ? TestIds.BANNER : Constants.expoConfig.extra.admobBannerId;

const SwapsScreen = () => {
    const [swaps, setSwaps] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasTwo, setHasTwo] = useState(false);

    const router = useRouter();

    useFocusEffect(useCallback(() => {
        loadSwaps();
    }, []));

    const loadSwaps = async (pull = false): Promise<void> => {
        if (!pull) setLoading(true);

        setHasTwo(await has(2));

        const res = await SwapApi.getAll();

        setSwaps(res);
        setLoading(false);
    };

    const onSwapPress = (id: string): void => {
        router.push({pathname: "/home/swap/viewSwap", params: {id: id}});
    };

    const swapItem = (obj) => {
        const swap = obj.item;

        if (swap.type === "ad") {
            return (
                <View key={swap.key}>
                    <BannerAd unitId={bannerAdUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                              requestOptions={{requestNonPersonalizedAdsOnly: true}}/>
                </View>
            );
        }

        return (
            <ListItem key={swap.key} onPress={() => onSwapPress(swap.id)}>
                <ListItem.Content>
                    <ListItem.Title>{swap.playlist_name}</ListItem.Title>
                    <ListItem.Subtitle>{swap.from_service} to {swap.to_service}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        );
    };

    return (
        <View style={styles.main}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <NewSwapButton/>
                    )
                }}
            />

            {
                !hasTwo && (
                    <View style={{padding: 20}}>
                        <Text>
                            You must have at least two music services linked to create a swap. Please link two services
                            in the settings tab before continuing.
                        </Text>
                    </View>
                ) || !swaps || swaps.length < 1 && (
                    <View style={{padding: 20}}>
                        <Text>
                            You have not created any swaps yet. Go ahead and create one now!
                        </Text>
                    </View>
                ) || swaps.length > 0 && (
                    <FlatList
                        data={swaps}
                        extraData={swaps}
                        renderItem={swapItem}
                        maxToRenderPerBatch={15}
                        initialNumToRender={15}
                        windowSize={15}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => loadSwaps(true)}/>
                        }
                    />
                )
            }

            <LoadingModal loading={loading}/>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});

export default SwapsScreen;
