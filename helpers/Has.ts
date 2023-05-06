import AsyncStorage from "@react-native-async-storage/async-storage";

export const has = async (howMany: number): Promise<boolean> => {
    let count = 0;

    if(await AsyncStorage.getItem("@hasSpotify") === "true") count++;
    if(await AsyncStorage.getItem("@hasAppleMusic") === "true") count++;
    if(await AsyncStorage.getItem("@hasTidal") === "true") count++;

    return count >= howMany;
};
