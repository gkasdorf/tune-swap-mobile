import React, {useCallback, useEffect, useState} from "react";
import SubscriptionApi from "../../../api/user/SubscriptionApi";
import {Alert, Platform, ScrollView, StyleSheet, View} from "react-native";
import {useFocusEffect} from "expo-router";
import {Button, Divider, Text} from "@rneui/themed";
import {Icon} from "@rneui/base";
import {
    clearTransactionIOS,
    deepLinkToSubscriptionsAndroid,
    deepLinkToSubscriptionsIos,
    endConnection,
    finishTransaction,
    getSubscriptions,
    initConnection,
    PurchaseError,
    purchaseErrorListener,
    purchaseUpdatedListener,
    requestSubscription
} from "react-native-iap";
import LoadingModal from "../../../ui/LoadingModal";
import {Subscription} from "../../../api/types/SubscriptionTypes";
import SubscriptionType from "../../../api/enums/SubscriptionType";
import {useAppDispatch} from "../../../hooks";
import {setUserSubscribed} from "../../../slices/user/userSlice";
import {VerifyReceiptAndroidRequest} from "../../../api/user/types/requests/SubscriptionApiRequests";

const SubscriptionScreen = () => {
    // This is going to be the current subscription of the user
    const [currentSubscription, setCurrentSubscription] = useState<Subscription|null>(null);

    // These are the data of the subscriptions from apple or play
    const [plusSubscription, setPlusSubscription] = useState<object|null>(null);
    const [turboSubscription, setTurboSubscription] = useState<object|null>(null);

    // Just some boolz
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean|null>(null);

    // Event handlers
    let purchaseUpdateSubscription = null;
    let purchaseErrorSubscription = null;

    const dispatch = useAppDispatch();

    // Load everything whenever the screen comes into focus
    useFocusEffect(useCallback(() => {
        initConnection().then(() => {
            loadIap();
            loadSubscription().then();
        });
    }, []));

    // Once we get success, we will reload the subscription and update the subscribed status for the user
    useEffect(() => {
        if(success === true) {
            loadSubscription().then(() => {
                dispatch(setUserSubscribed(true));
            });
        }
    }, [success]);

    // Whenever we leave we need to remove the event handlers
    useEffect(() => {
        return () => {
            endConnection().then();

            if(purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove();
            }

            if(purchaseErrorSubscription) {
                purchaseErrorSubscription.remove();
            }
        };
    }, []);

    // Load all IAP data
    const loadIap = () => {
        purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
            // Get the right receipt
            const receipt = Platform.OS === "ios" ? purchase.transactionReceipt : purchase.purchaseToken;

            if (receipt) {
                // Complete the transaction
                finishTransaction({purchase, isConsumable: false}).then(() => {
                    // Make the verification request

                    if(Platform.OS === "ios")
                        verifyReceiptIos(receipt);
                    else
                        verifyReceiptAndroid({
                            packageName: purchase.packageNameAndroid,
                            productId: purchase.productId,
                            receipt
                        });
                }).catch((err) => {
                    setSuccess(false);
                    Alert.alert("Error", err.message);
                });
            }
        });

        purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
            console.log(error.message);
        });

        // Load the subscriptions
        getSubscriptions({skus: ["com.gkasdorf.tuneswap.plus", "com.gkasdorf.tuneswap.turbo"]}).then((res) => {
            setTurboSubscription(res.find((item) => item.productId === "com.gkasdorf.tuneswap.turbo"));
            setPlusSubscription(res.find((item) => item.productId === "com.gkasdorf.tuneswap.plus"));
        });

        clearTransactionIOS().then().catch(err => {
            console.log(err);
        });
    };

    const loadSubscription = async (): Promise<void> => {
        // Get the current subscription
        const res = await SubscriptionApi.getSubscription();

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setCurrentSubscription(res.data.subscription);
        setLoading(false);
    };

    // Start the transaction
    const onSubscribePress = async (subscription): Promise<void> => {
        setLoading(true);

        // Attempt the transaction
        requestSubscription(
            {
                sku: subscription.productId,
                andDangerouslyFinishTransactionAutomaticallyIOS: false,
                subscriptionOffers: [{offerToken: "", sku: subscription.productId}]
            }).catch((err) => {
            setLoading(false);
            Alert.alert("Error", err.message);
        });
    };

    const verifyReceiptIos = async (receipt) => {
        // Make the verification request
        const res = await SubscriptionApi.verifyReceiptIos(receipt);

        if(!res.success) {
            Alert.alert("Error", res.data.message);
            setLoading(false);
            setSuccess(false);
            return;
        }

        setLoading(false);
        setSuccess(true);
    };

    const verifyReceiptAndroid = async(data: VerifyReceiptAndroidRequest) => {
        const res = await SubscriptionApi.verifyReceiptAndroid(data);

        if(!res.success) {
            Alert.alert("Error", res.data.message);
            setLoading(false);
            setSuccess(false);
            return;
        }

        setLoading(false);
        setSuccess(true);
    };

    return (
        <ScrollView style={styles.main}>
            <LoadingModal loading={loading}/>

            <View style={styles.content}>
                <View style={styles.item}>
                    <View style={styles.itemIcon}>
                        <Icon name={"local-fire-department"} type={"material"} size={50} color={"white"}/>
                    </View>
                    <View style={styles.itemText}>
                        <Text h4>Turbo {currentSubscription?.subscription_type === SubscriptionType.TURBO && "(Yours)"}</Text>
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
                    onPress={() => onSubscribePress(turboSubscription)}
                    disabled={!__DEV__ && turboSubscription !== null && currentSubscription?.subscription_type === SubscriptionType.TURBO}
                >
                    Subscribe for {
                        turboSubscription ? (
                            Platform.OS === "ios" ?
                                turboSubscription["localizedPrice"] :
                                turboSubscription["subscriptionOfferDetails"][0]["pricingPhases"]["pricingPhaseList"][0]["formattedPrice"]
                        ) : "$2.99"
                    }
                </Button>
                {/**/}
                <Divider style={{marginBottom: 20}}/>

                <View style={styles.item}>
                    <View style={[styles.itemIcon, styles.itemIconYellow]}>
                        <Icon name={"auto-awesome"} type={"material"} size={50} color={"white"}/>
                    </View>
                    <View style={styles.itemText}>
                        <Text h4>Plus {currentSubscription?.subscription_type === SubscriptionType.PLUS && "(Yours)"}</Text>
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
                    onPress={() => onSubscribePress(plusSubscription)}
                    disabled={!__DEV__ && plusSubscription !== null}
                >
                    Subscribe for {
                        plusSubscription ? (
                            Platform.OS === "ios" ?
                                plusSubscription["localizedPrice"] :
                                plusSubscription["subscriptionOfferDetails"][0]["pricingPhases"]["pricingPhaseList"][0]["formattedPrice"]
                        ) : "$0.99"
                    }
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
                {
                    currentSubscription !== null && (
                        <Button
                            buttonStyle={styles.buttonColored}
                            onPress={() => {
                                if(Platform.OS === "ios") deepLinkToSubscriptionsIos().then();
                                else deepLinkToSubscriptionsAndroid({sku: "com.gkasdorf.tuneswap.plus"}).then();
                            }}
                        >
                            Cancel Subscription
                        </Button>
                    )
                }
            </View>
        </ScrollView>
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