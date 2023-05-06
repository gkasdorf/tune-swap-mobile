import React from "react";
import {StyleSheet, TextInput, View} from "react-native";
import PropTypes from "prop-types";
import {Text} from "@rneui/themed";

const Input = ({label, placeholder, onChangeText, ...props}) => {
    return (
        <View style={styles.wrapper}>
            {
                label && (
                    <Text style={styles.label}>{label}</Text>
                )
            }
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    {...props}
                />
            </View>
        </View>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 10,
    },

    label: {
        marginBottom: 5,
        fontSize: 18,
        color: "gray",
    },

    inputWrapper: {
        borderStyle: "solid",
        borderColor: "#c0c0c0",
        borderRadius: 10,
        borderWidth: 1,

        padding: 10,
    },

    input: {
        fontSize: 20
    }
});

export default Input;