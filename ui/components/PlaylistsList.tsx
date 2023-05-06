import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ServicesApi from "../../api/services/ServicesApi";
import {Alert, FlatList} from "react-native";
import {ListItem} from "@rneui/themed";
import ImageOrIcon from "./ImageOrIcon";

const PlaylistsList = ({service, setLoading, onPlaylistPress, searchTerm = ""}) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async (): Promise<void> => {
        setLoading(true);
        const res = await ServicesApi.getUserPlaylists(service);

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setLoading(false);
        setPlaylists(res.data.playlists);
    };

    const playlistItem = (obj) => {
        const playlist = obj.item;

        if(searchTerm !== "" && !playlist.name.toLowerCase().includes(searchTerm.toLowerCase())) return null;

        return (
            <ListItem bottomDivider onPress={() => onPlaylistPress(playlist.id, playlist.name)}>
                <ImageOrIcon id={playlist.id} image={playlist.image} service={service} />
                <ListItem.Content>
                    <ListItem.Title>{playlist.name}</ListItem.Title>
                    <ListItem.Subtitle>{playlist.description ? playlist.description.replace(/<[^>]*>?/gm, "") : "No Description"}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        );
    };

    return (
        <FlatList data={playlists} renderItem={playlistItem} keyExtractor={item => item.id} />
    );
};

PlaylistsList.propTypes = {
    service: PropTypes.string,
    setLoading: PropTypes.func,
    onPlaylistPress: PropTypes.func,
    searchTerm: PropTypes.string
};

export default PlaylistsList;