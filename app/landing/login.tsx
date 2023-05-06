import React, {useEffect, useState} from "react";
import {Alert, Platform, StyleSheet, View} from "react-native";
import {Link, useRouter} from "expo-router";
import {Button, Text} from "@rneui/themed";
import Input from "../../ui/Input";
import style from "../../style";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {login} from "../../slices/auth/authActions";
import {clearAuth} from "../../slices/auth/authSlice";
import Info from "../../ui/Info";
import {selectUser, setUser} from "../../slices/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {
    AppleAuthenticationButton,
    AppleAuthenticationButtonStyle,
    AppleAuthenticationButtonType
} from "expo-apple-authentication";
import * as AppleAuthentication from "expo-apple-authentication";
import UserApi from "../../api/user/UserApi";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const {token} = useAppSelector(selectUser);
    const {loading, error, success} = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const router = useRouter();

    // Clear out the auth state when we leave
    useEffect(() => {
        return () => {
            dispatch(clearAuth());
        };
    }, []);

    // Whenever we get a successful response, we need to store the token and redirect to home
    useEffect(() => {
        (async () => {
            if(success) {
                await AsyncStorage.setItem("@token", token);

                router.replace("/home/swap");
            }
        })();
    }, [success]);

    // Handle input changes
    const handleChange = (name, value): void => {
        setForm({
            ...form,
            [name]: value
        });
    };

    // Handle the form submit
    const onFormSubmit = (): void => {
        dispatch(login({
            email: form.email,
            password: form.password
        }));
    };

    const onAppleButtonPress = async (): Promise<void> => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            const name = credential.fullName.givenName;
            const resp = await UserApi.loginWithApple(credential.authorizationCode, name);

            if(!resp.success) {
                console.log("Error");
                Alert.alert("Error", resp.data.message);
                return;
            }

            await AsyncStorage.setItem("@token", resp.data.data.api_token);

            dispatch(setUser({
                email: resp.data.data.email,
                name: resp.data.data.name,
                token: resp.data.data.api_token
            }));

            router.replace("/home/swap");
        } catch(e) {
            console.log(e);
            if(e.code !== "ERR_CANCELED") {
                Alert.alert("Error", "There was an error authenticating with Apple.");
            }
        }
    };

    return (
        <View style={styles.app}>
            <KeyboardAwareScrollView>
                <View style={styles.main}>
                    <Text style={styles.header}>Welcome Back</Text>
                    <Text>Let&apos;s get you signed in</Text>

                    {
                        error && (
                            <Info>{error}</Info>
                        )
                    }

                    <View style={styles.form}>
                        <Input
                            label={"Email"}
                            placeholder={"george@gmail.com"}
                            onChangeText={text => handleChange("email", text)}
                            autoComplete={"email"}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                        />
                        <Input
                            label={"Password"}
                            placeholder={"Str0ngP4ssw0rd"}
                            onChangeText={text => handleChange("password", text)}
                            autoComplete={"current-password"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            secureTextEntry={true}
                        />
                        <Button
                            onPress={onFormSubmit}
                            disabled={loading}
                        >
                            Login
                        </Button>
                        {
                            Platform.OS === "ios" && (
                                <AppleAuthenticationButton
                                    onPress={onAppleButtonPress}
                                    buttonType={AppleAuthenticationButtonType.SIGN_IN}
                                    buttonStyle={AppleAuthenticationButtonStyle.BLACK}
                                    style={{ width: "100%", height: 44, borderRadius: 10, marginBottom: 8 }}
                                />
                            )
                        }
                    </View>
                    <Text>Don&apos;t have an account? <Link href={"/landing/signup"} style={style.link}>Create one now!</Link></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "white"
    },

    main: {
        flex: 1,
        marginTop: "20%",
        marginHorizontal: 20,
        paddingBottom: 40
    },

    header: {
        fontSize: 28,
        marginBottom: 10
    },

    form: {
        marginTop: 10,

    },

    input: {
        borderStyle: "solid",
        borderWidth: 1
    }
});

export default Login;