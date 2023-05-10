import React, {useEffect} from "react";
import {requestTrackingPermissionsAsync} from "expo-tracking-transparency";
import {AdsConsent, AdsConsentStatus} from "react-native-google-mobile-ads";
import {Platform} from "react-native";

const TrackingPermissions = () => {
    const iosRequest = async () => {
        await requestTrackingPermissionsAsync();
        // We are not doing anything with this info as we do not render personalized ads
    };

    const androidRequest = async () => {
        const consentInfo = await AdsConsent.requestInfoUpdate();

        if (consentInfo.isConsentFormAvailable && consentInfo.status === AdsConsentStatus.REQUIRED) {
            await AdsConsent.showForm();
            // We are not showing personalized ads regardless, so we will not do anything with this response
        }
    };

    useEffect(() => {
        console.log("Requesting...");
        setTimeout(() => {
            if (Platform.OS === "ios") iosRequest();
            else androidRequest();
        }, 1500);
    }, []);

    return (
        <></>
    );
};

export default TrackingPermissions;