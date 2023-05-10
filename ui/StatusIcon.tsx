import React from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {Icon} from "@rneui/base";

export type StatusIconVariant = "success" | "error" | "pending";

type StatusIconProps = {
    variant: StatusIconVariant
};

const StatusIcon = ({variant}: StatusIconProps) => {
    const iconStyles: object[] = [styles.icon];
    let icon: string[];

    switch (variant) {
        case "success":
            iconStyles.push(styles.success);
            icon = ["done", "material"];
            break;
        case "error":
            iconStyles.push(styles.error);
            icon = ["warning", "material"];
            break;
        case "pending":
            iconStyles.push(styles.pending);
            icon = ["sync", "material"];
            break;
    }

    return (
        <View style={iconStyles}>
            {
                variant === "pending" ? (
                    <ActivityIndicator size={"large"} color={"white"} animating={variant === "pending"}/>
                ) : (
                    <Icon name={icon[0]} size={50} color={"white"} type={icon[1]}/>
                )
            }
        </View>
    );
};


const styles = StyleSheet.create({
    icon: {
        borderRadius: 100,

        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,

        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },

    success: {
        backgroundColor: "#4dc727",
    },

    error: {
        backgroundColor: "red"
    },

    pending: {
        backgroundColor: "lightblue",
        transform: [{rotate: "45deg"}]
    }
});

export default StatusIcon;