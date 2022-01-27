import React, {useState, useEffect, createRef} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import Loader from '../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfo = (props) => {
    const [userName, setUserName] = useState('');
    const [carPlatNumber, setCarPlatNumber] = useState('');
    const [userId, setUserId] = useState('');
    // const [userAddress, setUserAddress] = useState('');
    // const [carPlatNumber, setCarPlatNumber] = useState('');

    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    AsyncStorage.getItem("userId").then((value) => {
        setUserId(value);
    })
        .then(res => {
            //do something else
        });

    const usernameInputRef = createRef();
    const carplatnumberInputRef = createRef();
    // const emailInputRef = createRef();
    // const addressInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return;
        }
        if (!carplatnumberInputRef) {
            alert('Please fill Email');
            return;
        }
        //Show Loader
        setLoading(true);
        var dataToSend = {
            name: userName,
            carplatnumber: carPlatNumber,
            id: userId
        };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('http://car.webronix.com/api/auth/user-info', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                if (responseJson.success === true) {
                    console.log(responseJson);
                    props.navigation.navigate('HomeScreen');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    return (
        <View style={{flex: 1, backgroundColor: '#307ecc'}}>
            <Loader loading={loading}/>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={require('../../Image/aboutreact.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(carPlatNumber) => setCarPlatNumber(carPlatNumber)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Car Plat Number"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                carplatnumberInputRef.current && carplatnumberInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(userName) => setUserName(userName)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter User Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                usernameInputRef.current && usernameInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>


                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default UserInfo;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});