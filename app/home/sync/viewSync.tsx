import React, {useCallback, useState} from "react";
import {Stack, useFocusEffect, useRouter, useSearchParams} from "expo-router";
import {Alert, ScrollView, StyleSheet, View} from "react-native";
import SyncApi from "../../../api/sync/SyncApi";
import LoadingModal from "../../../ui/LoadingModal";
import {HeaderBackButton} from "@react-navigation/elements";
import {Button, ListItem, Text} from "@rneui/themed";
import {Sync} from "../../../api/types/SyncTypes";
import StatusIcon, {StatusIconVariant} from "../../../ui/StatusIcon";
import {parseTimestamp} from "../../../helpers/timeHelpers";
import SubscriptionType from "../../../api/enums/SubscriptionType";
import {ListItemChevron} from "@rneui/base/dist/ListItem/ListItem.Chevron";

const SyncScreen = () => {
    const [sync, setSync] = useState<Sync|null>(null);
    const [nextCheck, setNextCheck] = useState<string|null>(null);
    const [subscriptionType, setSubscriptionType] = useState<SubscriptionType|null>(null);
    const [loading, setLoading] = useState(true);

    const {id, isNew} = useSearchParams();

    const router = useRouter();

    useFocusEffect(useCallback(() => {
        loadSync().then();
    }, []));

    const loadSync = async (): Promise<void> => {
        const res = await SyncApi.get(id.toString());

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        console.log(res.data);

        setSync(res.data.sync);
        setNextCheck(res.data.nextCheck);
        setSubscriptionType(res.data.subscription);
        setLoading(false);
    };

    const onSetSyncStatusPress = async (): Promise<void> => {
        setLoading(true);

        const res = await SyncApi.setSyncing(sync.id.toString());

        if(!res.success) {
            setLoading(false);
            Alert.alert("Error", res.message);
            return;
        }

        setSync(res.data.sync);
        setLoading(false);
    };

    const getStatusVariant = (status: boolean): StatusIconVariant => {
        switch(status) {
            case true: {
                return "syncing";
            }
            case false: {
                return "paused";
            }
        }
    };

    return (
        <ScrollView style={styles.main}>
            <LoadingModal loading={loading}/>
            {
                isNew && (
                    <Stack.Screen
                        options={{
                            gestureEnabled: false,
                            headerLeft: () => (
                                <HeaderBackButton
                                    onPress={() => {
                                        router.replace("/home/sync");
                                    }}
                                />
                            )
                        }}
                    />
                )
            }
            {
                sync && (
                    <View style={styles.statusScreen}>
                        <Text h3 style={{textAlign: "center"}}>
                            {
                                sync.syncing ? "Active Sync" : "Inactive Sync"
                            }
                        </Text>
                        <Text style={{textAlign: "center"}}>
                            Sync between {sync.from_playlist.name} and {sync.to_playlist.name}
                        </Text>

                        <View style={styles.status}>
                            <StatusIcon variant={getStatusVariant(sync.syncing)} />
                        </View>
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title>Status</ListItem.Title>
                                <ListItem.Subtitle>
                                    {
                                        sync.syncing ? "Active" : "Inactive"
                                    }
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem topDivider>
                            <ListItem.Content>
                                <ListItem.Title>Last Checked</ListItem.Title>
                                <ListItem.Subtitle>
                                    {
                                        parseTimestamp(sync.last_checked)
                                    }
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem topDivider>
                            <ListItem.Content>
                                <ListItem.Title>Next Check</ListItem.Title>
                                <ListItem.Subtitle>
                                    {
                                        parseTimestamp(nextCheck)
                                    }
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem topDivider>
                            <ListItem.Content>
                                <ListItem.Title>Last Synced</ListItem.Title>
                                <ListItem.Subtitle>
                                    {
                                        parseTimestamp(sync.last_synced)
                                    }
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem topDivider>
                            <ListItem.Content>
                                <ListItem.Title>Synced Tracks</ListItem.Title>
                                <ListItem.Subtitle>
                                    {
                                        sync.from_total + "/" + sync.to_total
                                    }
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem topDivider>
                            <ListItem.Content>
                                <ListItem.Title>Check Interval</ListItem.Title>
                                <ListItem.Subtitle>
                                    {
                                        subscriptionType === SubscriptionType.TURBO ? (
                                            "Every 5 minutes"
                                        ) : (
                                            "Every hour"
                                        )
                                    }
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        <Button onPress={onSetSyncStatusPress}>
                            {
                                sync.syncing ? "Disable Sync" : "Enable Sync"
                            }
                        </Button>
                    </View>
                )
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10,
    },

    statusScreen: {
        flex: 1,

        backgroundColor: "white",

        margin: 10,
        marginBottom: 20,
        padding: 20,

        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },

    status: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30
    },

    syncInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30,

        marginTop: 30
    },

    syncInfoHeader: {
        fontWeight: "bold"
    },

    syncInfoSubtitle: {
        fontSize: 18,
        textAlign: "center"
    },
});

export default SyncScreen;