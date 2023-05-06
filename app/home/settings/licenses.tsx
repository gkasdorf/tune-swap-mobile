import React from "react";
import WebView from "react-native-webview";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const licenseHtml = require("../../../assets/license.html");

const LicensesScreen = () => {
    return (
        <WebView source={licenseHtml} originWhitelist={["*"]}/>
    );
};

export default LicensesScreen;