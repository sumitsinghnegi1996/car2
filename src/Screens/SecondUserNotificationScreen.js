import React, {useEffect, useState} from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Loader from "../Components/Loader";
import {RadioButton} from "react-native-paper";
import {AntDesign} from "@expo/vector-icons";
const {width, height} = Dimensions.get('window')
const SecondUserNotificationScreen = ({route, navigation}) => {
    const noti_second_user_id = route.params.second_user_id;
    const noti_user_id = route.params.user_id;
    const noti_body = route.params.noti_body;
    const [loading, setLoading] = useState(false);
    const [secondUserDescription, setSecondUserDescription] = useState('');
    const [description, setDescription] = useState('');
    const [userName, setUserName] = useState('');
    const [userNumberPlat, setUserNumberPlat] = useState('');
    const [carIssueIssues, setCarIssueIssues] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [checked, setChecked] = useState('');
    const [expoPushToken, setExpoPushToken] = useState('');
    useEffect(() => {
        loadData();
    });

    const loadData = () => {
        let dataToSend = {user_id: noti_user_id, seconduserId: noti_second_user_id};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch('http://car.webronix.com/api/auth/get_user_details_notofication', {
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
                    setUserName(responseJson.UserName);
                    setSecondUserDescription(responseJson.CarIssueDescription);
                    setUserNumberPlat(responseJson.UserCarNumber);
                    setCarIssueIssues(responseJson.CarIssueIssues);
                    setUserProfile(responseJson.UserProfile);
                    setExpoPushToken(responseJson.UserToken);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    }
    const onsubmitIssues = () => {
        sendPushNotification();
        let dataToSend = {user_id: noti_user_id, seconduserId: noti_second_user_id, checked: checked, description: description};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch('http://car.webronix.com/api/auth/save_second_notification_data', {
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
                     alert("done thanks for submitting");
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };


// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
    async function sendPushNotification() {
        console.log("send notification")
        console.log("send checked" + checked)
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: "\uD83D\uDCE7 Urgent! Urgent! Urgent! Urgent! Urgent! Second user",
            body: checked,
            priority: 'high', //to make sure notification is delivered as fast as possible. see documentation for more details
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


    return (
        <SafeAreaView style={{flex: 1}}>
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
                    <Text style={styles.carNumber}>{secondUserDescription}</Text>
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
                {/*<View style={{flexDirection: "row", alignItems: 'center', marginTop: 14,}}>*/}
                {/*    <View>*/}
                {/*        <RadioButton*/}
                {/*            style={{width: 50, height: 50, borderRadius: 50,}}*/}
                {/*            value="four"*/}
                {/*            color={"#000"}*/}
                {/*            status={checked === 'four' ? 'checked' : 'unchecked'}*/}
                {/*            onPress={() => setChecked('four')}*/}
                {/*        />*/}
                {/*    </View>*/}
                {/*    <View style={styles.LabelName}>*/}
                {/*        <Text style={{fontSize: 17, color: "#fff"}}>Lorem ipsum dolor sit amet</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}

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
export default SecondUserNotificationScreen;
