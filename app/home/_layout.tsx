import React from "react";
import {Tabs} from "expo-router";
import {Icon} from "@rneui/base";

const HomeLayout = () => {
    return (
        <>
            <Tabs>
                <Tabs.Screen
                    name={"swap"}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Swap",
                        tabBarIcon: ({color}) => (
                            <Icon name={"swap-calls"} type={"material"} color={color} />
                        )
                    }}
                />

                <Tabs.Screen
                    name={"share"}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Share",
                        tabBarIcon: ({color}) => (
                            <Icon name={"share"} type={"material"} color={color} />
                        )
                    }}
                />

                <Tabs.Screen
                    name={"settings"}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Settings",
                        tabBarIcon: ({color}) => (
                            <Icon name={"settings"} type={"material"} color={color} />
                        )
                    }}
                />
            </Tabs>
        </>
    );
};

export default HomeLayout;