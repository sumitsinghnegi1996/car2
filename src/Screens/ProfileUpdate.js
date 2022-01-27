import React, {useState, createRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Picker,
    TouchableOpacity,
    ScrollView, SafeAreaView,
} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';

import Loader from '../Components/Loader';

const ProfileUpdate = (props) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [userPhone , setUserPhone] = useState('');
    const [selectedValue, setSelectedValue] =  useState("java");
    const [photo, setPhoto] = useState('');
    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            // console.log(response);
            if (response) {
                setPhoto(response);
            }
        });
    };
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);

    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return;
        }
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userAge) {
            alert('Please fill Age');
            return;
        }
        if (!userAddress) {
            alert('Please fill Address');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        //Show Loader
        setLoading(true);
        var dataToSend = {
            name: userName,
            email: userEmail,
            age: userAge,
            address: userAddress,
            password: userPassword,
        };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('http://localhost:3000/api/user/register', {
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
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    setIsRegistraionSuccess(true);
                    console.log(
                        'Registration Successful. Please Login to proceed'
                    );
                } else {
                    setErrortext(responseJson.msg);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                {/*<Image*/}
                {/*    source={require('../Image/success.png')}*/}
                {/*    style={{*/}
                {/*        height: 150,*/}
                {/*        resizeMode: 'contain',*/}
                {/*        alignSelf: 'center'*/}
                {/*    }}*/}
                {/*/>*/}
                <Text style={styles.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Loader loading={loading} />
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
                        <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                            <TextInput
                                style={styles.inputStyle}
                                underlineColorAndroid={"#000"}
                                autoCapitalize="characters"
                                mode="outlined"
                                disabled={true}
                                onChangeText={setUserName}
                                value={userName}
                                label="Enter Name"
                                keyboardType={"default"}
                                theme={{ colors: { text: "#000" } }}
                                underlineColor={"#000"}
                                placeholderTextColor={"#000"}
                            />
                        </View>

                        <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                            <TextInput
                                style={styles.inputStyle}
                                underlineColorAndroid={"#000"}
                                autoCapitalize="characters"
                                mode="outlined"
                                disabled={true}
                                onChangeText={setUserPhone}
                                value={userPhone}
                                label="Enter Phone Number"
                                keyboardType={"default"}
                                theme={{ colors: { text: "#000" } }}
                                underlineColor={"#000"}
                                placeholderTextColor={"#000"}
                            />
                        </View>
                        <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                            <TextInput
                                style={styles.inputStyle}
                                underlineColorAndroid={"#000"}
                                autoCapitalize="characters"
                                mode="outlined"
                                onChangeText={setUserEmail}
                                value={userEmail}
                                label="User Email"
                                keyboardType={"default"}
                                theme={{ colors: { text: "#000" } }}
                                underlineColor={"#000"}
                                placeholderTextColor={"#000"}
                            />
                        </View>
                        <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                            <TextInput
                                style={styles.inputStyle}
                                underlineColorAndroid={"#000"}
                                autoCapitalize="characters"
                                mode="outlined"
                                onChangeText={setUserAddress}
                                value={userAddress}
                                label="User Address"
                                keyboardType={"default"}
                                theme={{ colors: { text: "#000" } }}
                                underlineColor={"#000"}
                                placeholderTextColor={"#000"}
                            />
                        </View>
                        {/*<View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>*/}
                        {/*    <TextInput*/}
                        {/*        style={styles.inputStyle}*/}
                        {/*        underlineColorAndroid={"#000"}*/}
                        {/*        autoCapitalize="characters"*/}
                        {/*        mode="outlined"*/}
                        {/*        onChangeText={setUserPassword}*/}
                        {/*        value={userPassword}*/}
                        {/*        label="User Password"*/}
                        {/*        keyboardType={"default"}*/}
                        {/*        theme={{ colors: { text: "#000" } }}*/}
                        {/*        underlineColor={"#000"}*/}
                        {/*        placeholderTextColor={"#000"}*/}
                        {/*    />*/}
                        {/*</View>*/}
                        {/*<View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>*/}
                        {/*    <TextInput*/}
                        {/*        style={styles.inputStyle}*/}
                        {/*        underlineColorAndroid={"#000"}*/}
                        {/*        autoCapitalize="characters"*/}
                        {/*        mode="outlined"*/}
                        {/*        onChangeText={setUserAge}*/}
                        {/*        value={userAge}*/}
                        {/*        label="User Age"*/}
                        {/*        keyboardType={"default"}*/}
                        {/*        theme={{ colors: { text: "#000" } }}*/}
                        {/*        underlineColor={"#000"}*/}
                        {/*        placeholderTextColor={"#000"}*/}
                        {/*    />*/}
                        {/*</View>*/}

                        <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Options" value="" />
                                <Picker.Item label="Car" value="car" />
                                <Picker.Item label="Car1" value="car1" />
                            </Picker>
                        </View>

                        <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                            {photo && (
                                <>
                                    <Image
                                        source={{ uri: photo.uri }}
                                        style={{ width: 300, height: 300 }}
                                    />
                                    <Button title="Upload Photo" onPress={handleUploadPhoto} />
                                </>
                            )}
                            <Button title="Choose Photo" onPress={handleChoosePhoto} />
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
        </SafeAreaView>
    );
};
export default ProfileUpdate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    SectionStyle: {
        // flexDirection: 'row',
        // height: 40,
        // marginTop: 20,
        // marginLeft: 35,
        // marginRight: 35,
        // margin: 10,
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
        paddingLeft: 50,
        paddingRight: 50,
        // borderWidth: 1,
        // borderRadius: 30,
        borderColor: '#000',
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