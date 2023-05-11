import React, {useCallback, useEffect, useState} from "react";
import SubscriptionApi from "../../../api/user/SubscriptionApi";
import {Alert, Button as RNButton, Platform, StyleSheet, View} from "react-native";
import {Stack, useFocusEffect} from "expo-router";
import {Button, Divider, Text} from "@rneui/themed";
import {Icon} from "@rneui/base";
import {
    clearProductsIOS,
    endConnection, finishTransaction, getSubscriptions,
    initConnection,
    PurchaseError, purchaseErrorListener, purchaseUpdatedListener,
    requestSubscription
} from 'react-native-iap';
import LoadingModal from "../../../ui/LoadingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SubscriptionScreen = () => {
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);

    let purchaseUpdateSubscription = null;
    let purchaseErrorSubscription = null;

    useFocusEffect(useCallback(() => {
        initConnection().then(() => {
            clearProductsIOS().then(() => {
                loadIap();
                loadSubscription().then();
            })
        });
    }, []));

    useEffect(() => {
        return () => {
            endConnection().then();

            if(purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove();
            }

            if(purchaseErrorSubscription) {
                purchaseErrorSubscription.remove();
            }
        }
    }, []);

    const loadIap = () => {
        purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
            console.log(purchase);

            const receipt = Platform.OS === 'ios' ? purchase.transactionReceipt : purchase.purchaseToken;

            if (receipt) {
                finishTransaction({purchase, isConsumable: false}).then((res) => {
                    AsyncStorage.setItem("@receipt", receipt);

                    setSuccess(true);
                }).catch((err) => {
                    setSuccess(false);
                    Alert.alert("Error", err.message);
                });
            }
        });

        purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
            console.log(error.message);
        });

        getSubscriptions({skus: ["com.gkasdorf.tuneswap.plus", "com.gkasdorf.tuneswap.turbo"]}).then((res) => {
            setSubscriptions(res);
            console.log(res);
        });
    };

    const loadSubscription = async (): Promise<void> => {
        const res = await SubscriptionApi.getSubscription();
        console.log(res);

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setCurrentSubscription(res.data.subscription);
        setLoading(false);
    }

    const onSubscribePress = async (subscription): Promise<void> => {
        setLoading(true);

        requestSubscription({sku: subscription.productId, andDangerouslyFinishTransactionAutomaticallyIOS: false}).then((res) => {
            setLoading(false);
            console.log(res);
        }).catch((err) => {
            setLoading(false);
            Alert.alert("Error", err.message);
        });
    };

    return (
        <View style={styles.main}>
            <LoadingModal loading={loading}/>
            <Stack.Screen options={{
                headerRight: () => (
                    <RNButton title={"Restore"} />
                )
            }}/>

            {
                currentSubscription === null ? (
                    <View style={styles.content}>
                        <View style={styles.item}>
                            <View style={styles.itemIcon}>
                                <Icon name={"local-fire-department"} type={"material"} size={50} color={"white"}/>
                            </View>
                            <View style={styles.itemText}>
                                <Text h4>Turbo</Text>
                                <Text>
                                    - Syncs performed every 5 minutes
                                </Text>
                                <Text>
                                    - Run up to three swaps at once
                                </Text>
                                <Text>
                                    - All features of Plus
                                </Text>
                                <Text>
                                    - All future features with no limitations
                                </Text>
                            </View>
                        </View>

                        <Button
                            buttonStyle={styles.buttonColored}
                            onPress={() => onSubscribePress(subscriptions[1])}
                            disabled={subscriptions === null}
                        >
                            Subscribe for {subscriptions ? subscriptions[1].localizedPrice : "$2.99"}
                        </Button>
                        {/**/}
                        <Divider style={{marginBottom: 20}}/>

                        <View style={styles.item}>
                            <View style={[styles.itemIcon, styles.itemIconYellow]}>
                                <Icon name={"auto-awesome"} type={"material"} size={50} color={"white"}/>
                            </View>
                            <View style={styles.itemText}>
                                <Text h4>Plus</Text>
                                <Text>
                                    Enjoy the same TuneSwap experience without ads.
                                </Text>
                                <Text>
                                    - No need to re-visit the app to keep syncs going
                                </Text>
                            </View>
                        </View>

                        <Button
                            buttonStyle={styles.buttonColored}
                            onPress={() => onSubscribePress(subscriptions[0])}
                            disabled={subscriptions === null}
                        >
                            Subscribe for {subscriptions ? subscriptions[0].localizedPrice : "$0000.99"}
                        </Button>

                        <Divider style={{marginBottom: 20}}/>

                        <View style={styles.item}>
                            <View style={[styles.itemIcon, styles.itemIconRed]}>
                                <Icon name={"heart-broken"} type={"material-community"} size={50} color={"white"}/>
                            </View>
                            <View style={styles.itemText}>
                                <Text h4>Free { currentSubscription === null && "(Yours)"}</Text>
                                <Text>
                                    - Ads displayed in app
                                </Text>
                                <Text>
                                    - Syncs performed every two hours
                                </Text>
                                <Text>
                                    - Must re-visit app every three days to keep syncs going
                                </Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <>

                    </>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    },

    content: {
        margin: 20,
    },

    item: {
        flexDirection: "row",
    },

    header: {

    },

    itemIcon: {
        backgroundColor: "#3ece46",
        height: 75,
        width: 75,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginRight: 20,
        justifyContent: "center",
    },

    itemIconYellow: {
        backgroundColor: "#f7c744",
    },

    itemIconRed: {
        backgroundColor: "#f74444",
    },

    itemText: {
        flex: 1,
        justifyContent: "center"

    },

    buttonColored: {
        backgroundColor: "#3e51ce",
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%"
    },
});

export default SubscriptionScreen;