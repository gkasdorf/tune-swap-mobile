import React, {useCallback, useState} from "react";
import {useFocusEffect, useSearchParams} from "expo-router";
import {Alert, StyleSheet, View} from "react-native";
import SyncApi from "../../../api/sync/SyncApi";
import LoadingModal from "../../../ui/LoadingModal";

const SyncScreen = () => {
    const [sync, setSync] = useState(null);
    const [loading, setLoading] = useState(true);

    const {id} = useSearchParams();

    useFocusEffect(useCallback(() => {
        loadSync().then();
    }, []));

    const loadSync = async (): Promise<void> => {
        const res = await SyncApi.get(id.toString());

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setSync(res.data.sync);
        setLoading(false);
    };

    return (
        <View style={styles.main}>
            <LoadingModal loading={loading}/>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default SyncScreen;