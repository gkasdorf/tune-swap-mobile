import React, {useCallback, useState} from "react";
import {ListItem, Text} from "@rneui/themed";
import {Stack, useFocusEffect, useRouter} from "expo-router";
import ShareApi from "../../../api/share/ShareApi";
import {Alert, Button as Btn, FlatList, Platform, RefreshControl, StyleSheet, View} from "react-native";
import LoadingModal from "../../../ui/LoadingModal";
import {has} from "../../../helpers/Has";

const ShareScreen = () => {
    const [shares, setShares] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasOne, setHasOne] = useState(false);

    const router = useRouter();

    useFocusEffect(useCallback(() => {
        loadShares().then();
    }, []));

    const loadShares = async (pull = false) => {
        if (!pull) setLoading(true);

        const doesHaveOne = await has(1);
        setHasOne(doesHaveOne);

        const res = await ShareApi.getAll();

        if (!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setShares(res.data.shares);
        setLoading(false);
    };

    const onSharePress = (id: string): void => {
        router.push({pathname: "/home/share/viewShare", params: {id: id}});
    };

    const shareItem = (obj) => {
        const share = obj.item;
        return (
            <ListItem
                onPress={() => onSharePress(share.access_id)}
            >
                <ListItem.Content>
                    <ListItem.Title>{share.playlist.name}</ListItem.Title>
                    <ListItem.Subtitle>{share.playlist.service}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        );
    };

    return (
        <View style={styles.main}>
            <Stack.Screen
                options={{
                    headerTitle: Platform.OS === "android" ? "" : "Your Shares",
                    headerLeft: () => (
                        <Btn onPress={() => router.push("/home/share/copies")} title={"My Copies"}/>
                    ),
                    headerRight: () => (
                        <Btn onPress={() => router.push("/home/share/newShare/stepOne")} title={"New Share"}/>
                    )
                }}
            />

            <LoadingModal loading={loading}/>
            {
                !hasOne && (
                    <View style={{padding: 20}}>
                        <Text>
                            You must have at least one music service linked to create a share. Please link a service
                            in the settings tab before continuing.
                        </Text>
                    </View>
                ) || !shares || shares.length < 1 && (
                    <View style={{padding: 20}}>
                        <Text>
                            You have not created any shares yet. Go ahead and create one now!
                        </Text>
                    </View>
                ) || shares.length > 0 && (
                    <FlatList
                        data={shares}
                        extraData={shares}
                        renderItem={shareItem}
                        keyExtractor={(item) => item.id.toString()}
                        maxToRenderPerBatch={15}
                        initialNumToRender={15}
                        windowSize={15}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => loadShares(true)}/>
                        }
                    />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },

    table: {
        marginHorizontal: 15,
    },
});

export default ShareScreen;