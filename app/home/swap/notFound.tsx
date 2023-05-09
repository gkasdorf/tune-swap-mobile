import React, {useCallback, useState} from "react";
import {useFocusEffect, useSearchParams} from "expo-router";
import SwapApi from "../../../api/swap/SwapApi";
import {Alert, FlatList, View} from "react-native";
import {ListItem} from "@rneui/themed";

const NotFoundScreen = () => {
    const [notFound, setNotFound] = useState(null);
    const [loading, setLoading] = useState(true);

    const {id} = useSearchParams();

    useFocusEffect(useCallback(() => {
        loadNotFound();
    }, []));

    const loadNotFound = async (): Promise<void> => {
        const res = await SwapApi.getNotFound(id);

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setNotFound(res.data.swap.songs_not_found);
        setLoading(false);
    };

    const notFoundItem = (obj) => {
        const song = obj.item;

        return (
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{song.song.name}</ListItem.Title>
                    <ListItem.Subtitle>{song.song.artist}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };

    return (
        <View style={{flex: 1}}>
            <FlatList
                data={notFound}
                extraData={notFound}
                renderItem={notFoundItem}
                keyExtractor={item => item.id}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                windowSize={10}
            />
        </View>
    );
};

export default NotFoundScreen;