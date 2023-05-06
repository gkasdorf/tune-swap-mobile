import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectUser} from "../../slices/user/userSlice";
import {Link, useRouter} from "expo-router";
import {clearAuth, SignupForm} from "../../slices/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {signup} from "../../slices/auth/authActions";
import {StyleSheet, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Button, Text} from "@rneui/themed";
import Info from "../../ui/Info";
import Input from "../../ui/Input";
import style from "../../style";
import LoadingModal from "../../ui/LoadingModal";

const SignupScreen = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordAgain: ""
    } as SignupForm);

    const {token} = useAppSelector(selectUser);
    const {loading, error, success} = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        return () => {
            dispatch(clearAuth());
        };
    }, []);

    useEffect(() => {
        (async() => {
            if(success) {
                await AsyncStorage.setItem("@token", token);

                router.replace("/home/swap");
            }
        })();
    }, [success]);

    const handleChange = (name: string, text: string): void => {
        setForm({
            ...form,
            [name]: text
        });
    };

    const onFormSubmit = (): void => {
        dispatch(signup(form));
    };

    return (
        <View style={styles.app}>
            <LoadingModal loading={loading} />
            <KeyboardAwareScrollView>
                <View style={styles.main}>
                    <Text style={styles.header}>Hey there! Let&apos;s get started.</Text>
                    <Text>Create an account and start moving and sharing your music today.</Text>

                    {
                        error && (
                            <Info>{error}</Info>
                        )
                    }

                    <View style={styles.form}>
                        <Input
                            label={"Name"}
                            placeholder={"Jack"}
                            onChangeText={text => handleChange("name", text)}
                            autoComplete={"given-name"}
                            autoCorrect={false}
                            autoCapitalize={"words"}
                        />
                        <Input
                            label={"Email"}
                            placeholder={"jack@reacher.com"}
                            onChangeText={text => handleChange("email", text)}
                            autoComplete={"email"}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                        />
                        <Input
                            label={"Password"}
                            placeholder={"Str0ngP4ssw0rd"}
                            onChangeText={text => handleChange("password", text)}
                            autoComplete={"new-password"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            secureTextEntry={true}
                        />
                        <Input
                            label={"Confirm Password"}
                            placeholder={"Str0ngP4ssw0rd"}
                            onChangeText={text => handleChange("passwordAgain", text)}
                            autoComplete={"new-password"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            secureTextEntry={true}
                        />
                        <Button
                            onPress={onFormSubmit}
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                    </View>
                    <Text>Already have an account? <Link href={"/landing/login"} style={style.link}>Sign back in</Link></Text>
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

export default SignupScreen;