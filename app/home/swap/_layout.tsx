import React from "react";
import {Stack} from "expo-router";

const SwapsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name={"index"} options={{title: "Swaps"}} />
            <Stack.Screen name={"viewSwap"} options={{title: "Swap"}} />
            <Stack.Screen name={"newSwap/stepOne"} options={{title: "Step One"}} />
            <Stack.Screen name={"newSwap/stepTwo"} options={{title: "Step Two"}} />
            <Stack.Screen name={"newSwap/stepThree"} options={{title: "Step Three"}} />
            <Stack.Screen name={"newSwap/stepFour"} options={{title: "Step Four"}} />
        </Stack>
    );
};

export default SwapsLayout;