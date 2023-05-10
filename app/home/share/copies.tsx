import React, {useCallback, useState} from "react";
import {ListItem, Text} from "@rneui/themed";
import {useFocusEffect, useRouter} from "expo-router";
import ShareApi from "../../../api/share/ShareApi";
import {Alert, FlatList, RefreshControl, StyleSheet, View} from "react-native";
import LoadingModal from "../../../ui/LoadingModal";

const CopiesScreen = () => {
    const [copies, setCopies] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useFocusEffect(useCallback(() => {
        loadCopies();
    }, []));

    const loadCopies = async (pull = false) => {
        if (!pull) setLoading(true);

        const res = await ShareApi.getCopies();

        if (!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setCopies(res.data.copies);
        setLoading(false);
    };

    const onCopyPress = (id: string): void => {
        router.push({pathname: "/home/share/viewCopy", params: {id: id}});
    };

    const copyItem = (obj) => {
        const copy = obj.item;
        return (
            <ListItem
                onPress={() => onCopyPress(copy.id)}
            >
                <ListItem.Content>
                    <ListItem.Title>{copy.share.playlist.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        );
    };

    return (
        <View style={styles.main}>
            <LoadingModal loading={loading}/>
            {
                !copies || copies.length < 1 && (
                    <View style={{padding: 20}}>
                        <Text>
                            You have not copied any playlists.
                        </Text>
                    </View>
                ) || copies.length > 0 && (
                    <FlatList
                        data={copies}
                        extraData={copies}
                        renderItem={copyItem}
                        keyExtractor={(item) => item.id.toString()}
                        maxToRenderPerBatch={15}
                        initialNumToRender={15}
                        windowSize={15}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => loadCopies(true)}/>
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

export default CopiesScreen;