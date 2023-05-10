import React from "react";
import {StyleSheet, View} from "react-native";
import {useRouter} from "expo-router";
import {useAppDispatch} from "../../../../hooks";
import MusicService from "../../../../api/enums/MusicService";
import {Text} from "@rneui/themed";
import ServicesList from "../../../../ui/components/ServicesList";
import {setSwapTo} from "../../../../slices/swap/swapSlice";

const SwapStepThreeScreen = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const onServicePress = (service: MusicService) => {
        dispatch(setSwapTo(service));

        router.push("/home/swap/newSwap/stepFour");
    };

    return (
        <View style={styles.main}>
            <View style={{padding: 20}}>
                <Text style={{textAlign: "center"}}>
                    And where are we swapping to?
                </Text>
            </View>
            <ServicesList onServicePress={onServicePress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default SwapStepThreeScreen;