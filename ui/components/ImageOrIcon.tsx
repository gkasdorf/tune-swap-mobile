import React from "react";
import MusicService from "../../api/enums/MusicService";
import {Image, StyleSheet} from "react-native";
import PropTypes from "prop-types";

const serviceToLogo = (service: string) => {
    if(service === MusicService.Spotify) return require("../../assets/Spotify.png");
    if(service === MusicService.AppleMusic) return require("../../assets/AppleMusic.png");
    if(service === MusicService.Tidal) return require("../../assets/Tidal.png");
};

const ImageOrIcon = ({id, image, service}) => {
    if(id === "library") {
        return <Image source={serviceToLogo(service)} style={styles.playlistImage} />;
    } else if(image && isNaN(image)) {
        return <Image source={{uri: image}} style={styles.playlistImage} />;
    } else {
        return <Image source={serviceToLogo(service)} style={styles.playlistImage} />;
    }
};

ImageOrIcon.propTypes = {
    id: PropTypes.string,
    image: PropTypes.string,
    service: PropTypes.string
};

const styles = StyleSheet.create({
    playlistImage: {
        height: 50,
        width: 50
    },
});

export default ImageOrIcon;