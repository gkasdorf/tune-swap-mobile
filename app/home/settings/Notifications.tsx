import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StyleSheet, View} from "react-native";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Cell, Section, TableView} from "react-native-tableview-simple";
import {Switch} from "@rneui/themed";
import NotificationsApi from "../../../api/user/NotificationsApi";

const NotificationsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async (): Promise<void> => {
        setNotificationsEnabled(await AsyncStorage.getItem("@notificationsEnabled") === "true");
    };

    const onSwitch = async (value: boolean): Promise<void> => {
        setNotificationsEnabled(value);
        await AsyncStorage.setItem("@notificationsEnabled", value.toString());

        const deviceId = await AsyncStorage.getItem("@deviceToken");

        if(value) {
            await NotificationsApi.enableNotifications(deviceId);
        } else {
            await NotificationsApi.disableNotifications(deviceId);
        }
    };

    return (
        <View style={styles.main}>
            <TableView style={styles.table}>
                <Section
                    roundedCorners={true}
                    hideSurroundingSeparators={true}
                    header={"NOTIFICATIONS"}
                >
                    <Cell
                        title={"Notifications Enabled"}
                        cellAccessoryView={<Switch value={notificationsEnabled} onValueChange={onSwitch}/>}
                    />
                </Section>
            </TableView>
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

export default NotificationsScreen;