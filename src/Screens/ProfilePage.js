import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {AppStyles} from "../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from 'react-native-paper';

const ProfilePage = ({navigation}) => {
    const [userName, setUserName] = useState("");
    const [mounted, setMounted] = useState(false);

    const ProfileUpdateButton = () => {
        navigation.navigate('ProfileUpdate');
    };


    if (!mounted) {
        AsyncStorage.getItem("userData").then((value) => {
            setUserName(JSON.parse(value).username);
        })
            .then(res => {
                //do something else
            });
    }
    const buttonPress = () => {
        AsyncStorage.clear();
        navigation.replace('Auth');
    };
    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Profile Page - {userName}</Text>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={ProfileUpdateButton}>
                <Text style={styles.buttonTextStyle}>Profile Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={buttonPress}>
                <Text style={styles.buttonTextStyle}>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    );
};
export default ProfilePage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 150,
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#ff5a66",
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    loginContainer: {
        width: "70%",
        backgroundColor: "#ff5a66",
        borderRadius: 25,
        padding: 10,
        marginTop: 30,
    },
    loginText: {
        color: "white",
    },
    signupContainer: {
        width: "70%",
        backgroundColor: "white",
        borderRadius: 25,
        padding: 8,
        borderWidth: 1,
        borderColor: "#ff5a66",
        marginTop: 15,
    },
    signupText: {
        color: "#ff5a66",
    },
    spinner: {
        marginTop: 200,
    },
    facebookContainer: {
        width: 192,
        backgroundColor: AppStyles.color.facebook,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
    },
    facebookText: {
        color: AppStyles.color.white,
    },
    googleContainer: {
        width: 192,
        height: 48,
        marginTop: 30,
    },
    googleText: {
        color: AppStyles.color.white,
    },
});