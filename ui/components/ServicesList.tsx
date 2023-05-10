import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Image, StyleSheet, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ListItem} from "@rneui/themed";
import MusicService from "../../api/enums/MusicService";

const SpotifyLogo = require("../../assets/Spotify.png");
const AppleMusicLogo = require("../../assets/AppleMusic.png");
const TidalLogo = require("../../assets/Tidal.png");

const ServicesList = ({onServicePress}) => {
    const [hasSpotify, setHasSpotify] = useState(false);
    const [spotifyEmail, setSpotifyEmail] = useState("");

    const [hasAppleMusic, setHasAppleMusic] = useState(false);

    const [hasTidal, setHasTidal] = useState(false);
    const [tidalUsername, setTidalUsername] = useState("");

    useEffect(() => {
        checkServices().then();
    }, []);

    const checkServices = async (): Promise<void> => {
        setHasSpotify(await AsyncStorage.getItem("@hasSpotify") === "true");
        setSpotifyEmail(await AsyncStorage.getItem("@spotifyEmail"));

        setHasAppleMusic(await AsyncStorage.getItem("@hasAppleMusic") === "true");

        setHasTidal(await AsyncStorage.getItem("@hasTidal") === "true");
        setTidalUsername(await AsyncStorage.getItem("@tidalUsername"));
    };

    return (
        <View>
            {
                hasSpotify ? (
                    <ListItem bottomDivider onPress={() => onServicePress(MusicService.Spotify)}>
                        <Image source={SpotifyLogo} style={styles.logo}/>
                        <ListItem.Content>
                            <ListItem.Title>Spotify</ListItem.Title>
                            <ListItem.Subtitle>{spotifyEmail}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>
                ) : null
            }
            {
                hasAppleMusic ? (
                    <ListItem bottomDivider onPress={() => onServicePress(MusicService.AppleMusic)}>
                        <Image source={AppleMusicLogo} style={styles.logo}/>
                        <ListItem.Content>
                            <ListItem.Title>Apple Music</ListItem.Title>
                            <ListItem.Subtitle>Linked</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>
                ) : null
            }
            {
                hasTidal ? (
                    <ListItem bottomDivider onPress={() => onServicePress(MusicService.Tidal)}>
                        <Image source={TidalLogo} style={styles.logo}/>
                        <ListItem.Content>
                            <ListItem.Title>Tidal</ListItem.Title>
                            <ListItem.Subtitle>{tidalUsername}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>
                ) : null
            }
        </View>
    );
};

ServicesList.propTypes = {
    onServicePress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10
    },

    logo: {
        width: 50,
        height: 50
    }
});
export default ServicesList;