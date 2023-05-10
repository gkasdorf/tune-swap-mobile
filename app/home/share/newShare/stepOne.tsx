import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";
import ServicesList from "../../../../ui/components/ServicesList";
import MusicService from "../../../../api/enums/MusicService";
import {useRouter} from "expo-router";

const ShareStepOneScreen = () => {
    const router = useRouter();

    const onServicePress = (service: MusicService) => {
        router.push({pathname: "/home/share/newShare/stepTwo", params: {service: service}});
    };

    return (
        <View style={styles.main}>
            <View style={{padding: 20}}>
                <Text style={{textAlign: "center"}}>
                    First, tell us where you want to share from.
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

export default ShareStepOneScreen;