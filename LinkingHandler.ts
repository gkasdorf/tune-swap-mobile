import * as Linking from "expo-linking";
import {useURL} from "expo-linking";
import {useFocusEffect, useRouter} from "expo-router";
import {useCallback} from "react";

const LinkingHandler = () => {
    const url = useURL();
    const router = useRouter();

    useFocusEffect(useCallback(() => {
        if(url) {
            const {path} = Linking.parse(url);
            const pathArr = path.split("/");

            if(pathArr[0] === "share") {
                router.replace({pathname: "/home/share/newCopy", params: {id: pathArr[1]}});
            }
        }
    }, [url]));
};

export default LinkingHandler;