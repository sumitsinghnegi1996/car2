import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, Pressable, ImageBackground, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../Components/Loader";
const image = { uri: "https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png" };
const Otp = ({ route, navigation }) => {
    const { UserData } = route.params;
    const [otp, setOtp] = useState(JSON.stringify(UserData.sendOtpDetails));
    const [loading, setLoading] = useState(false);


    const buttonPress = () => {
        if (!otp) {
            alert('Please fill otp');
            return;
        }
        console.log(otp);
        setLoading(true);
        let dataToSend = {otp: otp, phone: UserData.phone};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('http://car.webronix.com/api/auth/verify-code', {
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
                if (responseJson.success === true) {
                    console.log(responseJson.userId + "user id save");
                    AsyncStorage.setItem('userId', JSON.stringify(responseJson.userId));console.log(responseJson.userData);
                    AsyncStorage.setItem('userData', responseJson.userData);
                    console.log(responseJson.car_plat_number);
                    if(!responseJson.car_plat_number){
                        navigation.navigate('UserInfo');
                    }else{
                        navigation.navigate('HomeScreen');
                    }

                } else {
                    // setErrortext(responseJson.msg);
                    console.log('Please check otp');
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
                {/*<OTPInputView*/}
                {/*    pinCount={4}*/}
                {/*    style={styles.otpView}*/}
                {/*    codeInputFieldStyle={styles.underlineStyleBase}*/}
                {/*    onCodeFilled={value => {*/}
                {/*        console.log(value);*/}
                {/*    }}*/}
                {/*/>*/}
                <TextInput
                    style={styles.input}
                    onChangeText={setOtp}
                    value={otp}
                    placeholder="Otp"
                    keyboardType="numeric"

                />
                <Text style={styles.titleText}>Phone No.: {JSON.stringify(UserData.phone)}</Text>

                <Pressable style={styles.button} onPress={() => buttonPress()}>
                    <Text style={styles.titleText}>Submit</Text>
                </Pressable>

                    <Text style={styles.titleText2}>
                        <Text style={{marginBottom: '10px',display:'block'}}>By continuing, you agree to our</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    otpView: {
        width: '80%',
        height: 200,
        color: 'black',
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: 'black',
        borderBottomColor: '#17BED0',
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
    image: {
        flex: 1,
        justifyContent: "center"
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

export default Otp;
