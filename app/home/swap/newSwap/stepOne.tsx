import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import {useFocusEffect, useRouter} from "expo-router";
import {useAppDispatch} from "../../../../hooks";
import MusicService from "../../../../api/enums/MusicService";
import {Text} from "@rneui/themed";
import ServicesList from "../../../../ui/components/ServicesList";
import {clearSwap, setSwapFrom} from "../../../../slices/swap/swapSlice";

const SwapStepOneScreen = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useFocusEffect(useCallback(() => {
        dispatch(clearSwap());
    }, []));

    const onServicePress = (service: MusicService) => {
        dispatch(setSwapFrom(service));

        router.push("/home/swap/newSwap/stepTwo");
    };

    return (
        <View style={styles.main}>
            <View style={{padding: 20}}>
                <Text style={{textAlign: "center"}}>
                    First, tell us where you want to swap from.
                </Text>
            </View>
            <ServicesList onServicePress={onServicePress} />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default SwapStepOneScreen;