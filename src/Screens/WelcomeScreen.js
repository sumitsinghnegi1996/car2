// Import React and Component
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {AppStyles} from "../AppStyles";

const WelcomeScreen = ({navigation}) => {

    const handleSubmitPress = () => {
        navigation.navigate('LoginWithHome');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Say hello to your new app</Text>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>LOGIN PHONE</Text>
            </TouchableOpacity>
            <TouchableOpacity
                containerStyle={styles.facebookContainer}
                style={styles.facebookText}
                onPress={() => handleSubmitPress()}>
                <Text style={styles.buttonTextStyle}> Login with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
                containerStyle={styles.googleContainer}
                style={styles.googleText}
                onPress={() => handleSubmitPress()}>
                <Text style={styles.buttonTextStyle}>Login with Google</Text>
            </TouchableOpacity>
        </View>
    );
};
export default WelcomeScreen;


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