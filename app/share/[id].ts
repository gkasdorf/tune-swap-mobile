import {useRootNavigationState, useRouter, useSearchParams} from "expo-router";
import {useEffect} from "react";

const ShareRedirect = () => {
    const {id} = useSearchParams();
    const router = useRouter();

    const navigationState = useRootNavigationState();

    useEffect(() => {
        if (!navigationState?.key) {
            return;
        }

        if (id) {
            router.replace({pathname: "/", params: {redirect: "/home/share/newCopy", data: id.toString()}});
        }
    }, [navigationState?.key, id]);
};

export default ShareRedirect;