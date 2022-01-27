import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Pressable,
    ImageBackground,
    Linking
} from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import Loader from '../Components/Loader';
const image = { uri: "https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png" };

const LoginWithHome = ({navigation}) => {

    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);
    const [loading, setLoading] = useState(false);

    const buttonPress = () => {
        if (!phoneNumber) {
            alert('Please fill phone');
            return;
        }
        console.log(phoneNumber);
        setLoading(true);
        let dataToSend = {phone: phoneNumber};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('http://car.webronix.com/api/auth/check-phone', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
                'Accept': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                if (responseJson.success === true) {
                    navigation.navigate('OTP', {
                        UserData: responseJson
                    });
                } else {
                    // setErrortext(responseJson.msg);
                    console.log('Please check your email id or password');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <Loader loading={loading} />
                <PhoneInput
                    style={styles.input}
                    autoFocus={false}
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="IN"
                    onChangeFormattedText={(text) => {
                        setphoneNumber(text);
                    }}
                    withDarkTheme
                    withShadow
                />
                <Pressable style={styles.button} onPress={() => buttonPress()}>
                    <Text style={styles.titleText}>Get Phone Number</Text>
                </Pressable>

                <Text style={styles.titleText2}>
                    <Text>By continuing, you agree to our</Text>
                    <Text>
                        <Text onPress={() => Linking.openURL('http://google.com')}>Terms of Service  |</Text>
                        <Text onPress={() => Linking.openURL('http://google.com')}> Privacy Policy  |</Text>
                        <Text onPress={() => Linking.openURL('http://google.com')}> Content Policy</Text>
                    </Text>
                </Text>
            </View>
        </ImageBackground>

    );
};

export default LoginWithHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    phoneContainer: {
        width: '75%',
        height: 50,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    button: {
        marginTop: 30,
        width: '75%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius:40,
        color: 'white',
    },
    textInput: {
        paddingVertical: 0,
    },
    titleText: {
        color: '#fff',
    },
    titleText2: {
        textAlign: 'center',
        color: '#fff',
        padding: 25,
    }
});
