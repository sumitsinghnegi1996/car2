import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Button,
    Text,
    SafeAreaView,
    Pressable,
    CheckBox,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity, Dimensions
} from 'react-native';
import Loader from "../Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RadioButton} from 'react-native-paper';
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import {AntDesign} from "@expo/vector-icons";
const {width, height} = Dimensions.get('window')

const IssuesOptionScreen = ({route, navigation}) => {
    const CarUserData = route.params.CarUserData;
    console.log(CarUserData);
    const [checked, setChecked] = useState('');
    const [seconduserId, setSecondUserId] = useState();
    const [userId, setUserId] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [userName, setUserName] = useState('');
    const [userNumberPlat, setUserNumberPlat] = useState('');

    // set value
    useEffect(() => {
        setExpoPushToken(CarUserData.UserToken);
        setUserNumberPlat(CarUserData.UserCarNumber);
        setUserName(CarUserData.UserName);
    }, [CarUserData]);

    useEffect(() => {
        // get and set user id
        AsyncStorage.getItem("userId").then((value) => {
            setUserId(value);
        })
        .then(res => {
            // do something else
        });
        setSecondUserId(CarUserData.UserId);
    });


// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
    async function sendPushNotification() {
        console.log("send notification")
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: "\uD83D\uDCE7 Urgent! Urgent! Urgent! Urgent! Urgent!",
            body: checked,
            data: { second_user_id: seconduserId , user_id: userId},
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    const onsubmitIssues = () => {
        console.log(checked);
        console.log(userId);
        console.log(description);
        console.log("seconduserId");
        // sendPushNotification();
        let dataToSend = {options: checked, user_id: userId, description: description, seconduserId: seconduserId};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch('http://car.webronix.com/api/auth/save_user_issues_and_send_notification', {
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
                    navigation.navigate('PingScreen', {
                        CarIssueDetails: responseJson.car_issue_update
                    });
                    // navigation.navigate('Ping');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    return (
            <SafeAreaView>
                <View style={styles.container}>
                    <Loader loading={loading}/>
                    <Image
                        style={{width: 50, height: 50}}
                        source={require('../../Image/success.png')}
                        resizeMode={'cover'} // cover or contain its upto you view look
                    />

                    <View style={styles.usertextMain}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.carNumber}>{userNumberPlat}</Text>
                    </View>

                    <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                        <View>
                            <RadioButton
                                style={{width: 50, height: 50, borderRadius: 50,}}
                                value="first"
                                color={"#000"}
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                            />
                        </View>
                        <View style={styles.LabelName}>
                            <Text style={{fontSize: 17, color: "#fff"}}>Lorem ipsum dolor sit amet</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                        <View>
                            <RadioButton
                                style={{width: 50, height: 50, borderRadius: 50,}}
                                value="second"
                                color={"#000"}
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                            />
                        </View>
                        <View style={styles.LabelName}>
                            <Text style={{fontSize: 17, color: "#fff"}}>Lorem ipsum dolor sit amet</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                        <View>
                            <RadioButton
                                style={{width: 50, height: 50, borderRadius: 50,}}
                                value="third"
                                color={"#000"}
                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('third')}
                            />
                        </View>
                        <View style={styles.LabelName}>
                            <Text style={{fontSize: 17, color: "#fff"}}>Lorem ipsum dolor sit amet</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>
                        <View>
                            <RadioButton
                                style={{width: 50, height: 50, borderRadius: 50,}}
                                value="four"
                                color={"#000"}
                                status={checked === 'four' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('four')}
                            />
                        </View>
                        <View style={styles.LabelName}>
                            <Text style={{fontSize: 17, color: "#fff"}}>Lorem ipsum dolor sit amet</Text>
                        </View>
                    </View>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setDescription}
                            value={description}
                            multiline={true}
                            keyboardType={"default"}
                            placeholder="useless placeholder"
                        />
                    </View>

                    <View style={styles.ContainerSubmit}>

                        <TouchableOpacity onPress={onsubmitIssues}
                            style={styles.SubmitButton}>
                            <AntDesign name="arrowright"  style={{marginLeft: 20}} size={40} color="white" />
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
    )

    // return (
    //     <SafeAreaView style={{flex: 1}}>
    //         <View style={{flex: 1, padding: 16}}>
    //
    //             <Button title="Go back" onPress={() => navigation.goBack()}/>
    //             <Loader loading={loading}/>
    //             <Text>Name : {CarUserData.UserName} == {expoPushToken}</Text>
    //             <Text>Issue</Text>
    //             <View style={{flexDirection: "row", alignItems: 'center'}}>
    //                 <View style={{flex: 4}}>
    //                     <Text>first</Text>
    //                 </View>
    //                 <View style={{flex: 1}}>
    //                     <RadioButton
    //                         value="first"
    //                         status={checked === 'first' ? 'checked' : 'unchecked'}
    //                         onPress={() => setChecked('first')}
    //                     />
    //                 </View>
    //             </View>
    //             <View style={{flexDirection: "row", alignItems: 'center'}}>
    //                 <View style={{flex: 4}}>
    //                     <Text>second</Text>
    //                 </View>
    //                 <View style={{flex: 1}}>
    //                     <RadioButton
    //                         value="second"
    //                         status={checked === 'second' ? 'checked' : 'unchecked'}
    //                         onPress={() => setChecked('second')}
    //                     />
    //                 </View>
    //             </View>
    //             <View style={{flexDirection: "row", alignItems: 'center'}}>
    //                 <View style={{flex: 4}}>
    //                     <Text>third</Text>
    //                 </View>
    //                 <View style={{flex: 1}}>
    //                     <RadioButton
    //                         value="third"
    //                         status={checked === 'third' ? 'checked' : 'unchecked'}
    //                         onPress={() => setChecked('third')}
    //                     />
    //                 </View>
    //             </View>
    //             <View style={{flexDirection: "row", alignItems: 'center'}}>
    //                 <View style={{flex: 4}}>
    //                     <Text>four</Text>
    //                 </View>
    //                 <View style={{flex: 1}}>
    //                     <RadioButton
    //                         value="four"
    //                         status={checked === 'four' ? 'checked' : 'unchecked'}
    //                         onPress={() => setChecked('four')}
    //                     />
    //                 </View>
    //             </View>
    //             <TextInput
    //                 style={styles.input}
    //                 onChangeText={setDescription}
    //                 value={description}
    //                 placeholder="Description"
    //                 keyboardType="numeric"
    //
    //             />
    //             <Pressable style={styles.button} onPress={() => onsubmitIssues()}>
    //                 <Text>Submit</Text>
    //             </Pressable>
    //
    //
    //         </View>
    //     </SafeAreaView>
    // );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        fontSize: 15,
        color: "#000",
        textAlign: "center"
    },
    carNumber: {
        fontSize: 15,
        color: "#000",
        marginTop: 5,
        textAlign: "center",
        marginBottom: 25,
    },
    LabelName: {
        backgroundColor: "#000",
        width: 290,
        paddingTop: 14,
        paddingRight: 14,
        paddingBottom: 17,
        paddingLeft: 20,
        borderRadius: 30,
        marginLeft: 6,
    },
    radioBtn: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    input: {
        borderColor: "#000",
        width: 280,
        marginLeft: 51,
        height: height / 8,
        borderRadius: 20,
        marginTop: 15,
        backgroundColor: "#ccc",
        padding: 10,
    },
    SubmitButton: {
        backgroundColor: "#000",
        width: 80,
        height: 60,
        borderRadius: 40,
        alignSelf: "center",
        paddingTop: 7,
    },
    ContainerSubmit: {
        alignSelf: "flex-end",
        marginTop: height / 10,
        marginRight: 35,
    },

});
export default IssuesOptionScreen;