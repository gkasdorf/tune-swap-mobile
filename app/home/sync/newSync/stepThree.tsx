import React, {useCallback} from "react";
import {useAppDispatch} from "../../../../hooks";
import {useFocusEffect, useRouter} from "expo-router";
import MusicService from "../../../../api/enums/MusicService";
import {clearSync, setSyncFromService, setSyncToService} from "../../../../slices/sync/syncSlice";
import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";
import ServicesList from "../../../../ui/components/ServicesList";

const SyncStepThreeScreen = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const onServicePress = (service: MusicService) => {
        dispatch(setSyncToService(service));

        router.push("/home/sync/newSync/stepFour");
    };

    return (
        <View style={styles.main}>
            <View style={{padding: 20}}>
                <Text style={{textAlign: "center"}}>
                    Where is the second playlist?
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

export default SyncStepThreeScreen;