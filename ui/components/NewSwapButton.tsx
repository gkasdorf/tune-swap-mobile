import React from "react";
import UserApi from "../../api/user/UserApi";
import {Alert, Button} from "react-native";
import {useRouter} from "expo-router";

const NewSwapButton = () => {
    const router = useRouter();

    const onPress = async () => {
        const res = await UserApi.isRunning();

        if(!res.success) {
            Alert.alert("Error", res.message);
            return;
        }

        router.push("/home/swap/newSwap/stepOne");
    };

    return (
        <Button title={"New Swap"} onPress={onPress} />
    );
};

export default NewSwapButton;
