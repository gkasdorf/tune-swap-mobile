import React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";

const Button = ({children, ...props}) => {
    return (
        <Button buttonStyle={styles.button} {...props}>{children}</Button>
    );
};

Button.propTypes = {
    children: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        borderRadius: 5
    }
});

export default Button;