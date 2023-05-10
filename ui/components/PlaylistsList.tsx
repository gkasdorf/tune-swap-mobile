import React, {useEffect, useState} from "react";
import ServicesApi from "../../api/services/ServicesApi";
import {Alert, FlatList, Platform, SafeAreaView, ScrollView, View} from "react-native";
import {ListItem, SearchBar} from "@rneui/base";
import ImageOrIcon from "./ImageOrIcon";
import MusicService from "../../api/enums/MusicService";
import {SearchBarDefault} from "@rneui/base/dist/SearchBar/SearchBar-default";
import {SearchBarIOS} from "@rneui/base/dist/SearchBar/SearchBar-ios";
import {SearchBarAndroid} from "@rneui/base/dist/SearchBar/SearchBar-android";

interface PlaylistsListProps {
    service: MusicService | string;
    setLoading: (loading: boolean) => void;
    onPlaylistPress: (id: string, name: string) => void;
    searchTerm?: string;
    includeLibrary?: boolean;
}

const PlaylistsList = ({
    service,
    setLoading,
    onPlaylistPress,
    searchTerm = "",
    includeLibrary = false
}: PlaylistsListProps) => {
    const [playlists, setPlaylists] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadPlaylists().then();
    }, []);

    const loadPlaylists = async (): Promise<void> => {
        setLoading(true);
        const res = await ServicesApi.getUserPlaylists(service);

        if (!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        if (includeLibrary) {
            res.data.playlists.unshift({
                id: "library",
                name: "Your Library",
                description: null,
                image: null
            });
        }

        setLoading(false);
        setPlaylists(res.data.playlists);
    };

    const playlistItem = (obj) => {
        const playlist = obj.item;

        if (search !== "" && !playlist.name.toLowerCase().includes(search.toLowerCase())) return null;

        return (
            <ListItem bottomDivider onPress={() => onPlaylistPress(playlist.id, playlist.name)}>
                <ImageOrIcon id={playlist.id} image={playlist.image} service={service}/>
                <ListItem.Content>
                    <ListItem.Title>{playlist.name}</ListItem.Title>
                    <ListItem.Subtitle>{playlist.description ? playlist.description.replace(/<[^>]*>?/gm, "") : "No Description"}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        );
    };

    return (
        <View>

            <FlatList
                data={playlists}
                renderItem={playlistItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => {
                    return (
                        Platform.OS === "ios" ? (
                            <SearchBarIOS
                                value={search}
                                onChangeText={text => setSearch(text)}
                            />
                        ) : (
                            <SearchBarAndroid
                                value={search}
                                onChangeText={text => setSearch(text)}
                            />
                        )
                    )
                }}
            />
        </View>
    );
};

export default PlaylistsList;