import React, {useCallback} from "react";
import {useAppDispatch} from "../../../../hooks";
import {useFocusEffect, useRouter} from "expo-router";
import MusicService from "../../../../api/enums/MusicService";
import {clearSync, setSyncFromService} from "../../../../slices/sync/syncSlice";
import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";
import ServicesList from "../../../../ui/components/ServicesList";

const SyncStepOneScreen = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useFocusEffect(useCallback(() => {
        dispatch(clearSync());
    }, []));

    const onServicePress = (service: MusicService) => {
        dispatch(setSyncFromService(service));

        router.push("/home/sync/newSync/stepTwo");
    };

    return (
        <View style={styles.main}>
            <View style={{padding: 20}}>
                <Text style={{textAlign: "center"}}>
                    Where is the first playlist?
                </Text>
                <ServicesList onServicePress={onServicePress} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default SyncStepOneScreen;