import {useRouter, useSearchParams} from "expo-router";
import {useEffect} from "react";

const ShareRedirect = () => {
    const {id} = useSearchParams();

    const router = useRouter();

    useEffect(() => {
        if (id) {
            router.replace({pathname: "/home/share/newCopy", params: {id: id as string}});
        }
    }, [id]);
};

export default ShareRedirect;