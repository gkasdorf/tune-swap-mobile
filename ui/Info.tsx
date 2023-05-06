import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";

const Info = ({children, variant}) => {
    return (
        <View style={styles.alert}>
            <Text>{children}</Text>
        </View>
    );
};

Info.propTypes = {
    children: PropTypes.string,
    variant: PropTypes.string
};

const styles = StyleSheet.create({
    alert: {
        backgroundColor: "#f8f8c6",
        padding: 10,
        marginVertical: 10,

        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#e5e58f"
    }
});

export default Info;