import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Platform, Dimensions
} from 'react-native';
import Loader from "../Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import {FAB} from "react-native-paper";
import Carousel from "../../component/Carousel";
import {dummyData} from "../../data/Data";
import {RoundedButton} from "../Components/RoundedButton";
import {AntDesign} from "@expo/vector-icons";

const {width, height} = Dimensions.get('window')
import {TextInput} from 'react-native-paper';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});


const HomeScreen = ({navigation}) => {
    const [carplatnumber, setCarPlatNumber] = useState('');
    const [userIdRole, setUserIdRole] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [expoPushToken, setExpoPushToken] = useState('');
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        readData()
    }, []);

    // Get Notification On Click
    // useEffect(() => {
    //     // registerForPushNotificationsAsync();
    //     Notifications.addNotificationReceivedListener(handleNotification);
    //
    //     Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    // }, []);


    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        Notifications.addNotificationReceivedListener(notification => {
            // setNotification(notification);
            console.log(notification + "aayayyayyya");
            handleNotification();
        });



        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response + "ninininini");
            handleNotificationResponse();
        });
    }, []);

    const handleNotification = notification => {
        // this.setState({ notification: notification });
        console.log('here ' + notification);
    };

    const handleNotificationResponse = response => {
        console.log(response.notification.request.content.data.second_user_id + " second_user_id");
        console.log(response.notification.request.content.data.user_id + " user_id");
        console.log(response.notification.request.content.body + " body");
        navigation.navigate('SecondUserNotificationScreen', {
            noti_second_user_id: response.notification.request.content.data.second_user_id,
            noti_user_id: response.notification.request.content.data.user_id,
            noti_body: response.notification.request.content.body,
        });
    };
    const buttonPress = () => {
        AsyncStorage.clear();
        navigation.replace('Auth');
    };
    const readData = async () => {
        try {
            const userid = await AsyncStorage.getItem('userId')
            console.log(userid)
            if (userid !== null) {
                console.log("set");
                setUserIdRole(userid);
                registerForPushNotificationsAsync().then(token => setNotificationToken(token, userid)).catch(err => console.log(err));
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getDevicePushTokenAsync()).data;
            console.log(token + "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            return token;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }
    export const sendPushNotifications = () =>
        getWeatherData('Barcelona').then((cityData) => {
            const expoPushMessages: ExpoPushMessage[] = pushTokens.map((pushToken) => ({
                body: `${cityData.temperature} ºC`,
                data: cityData,
                title: `Barcelona is ${cityData.weatherName} today`,
                to: pushToken
            }));

            const expo = new Expo();
            return expo.sendPushNotificationsAsync(expoPushMessages);
            /* Note that expo.sendPushNotificationsAsync will not send the push notifications
             * to the user immediately but will send the information to Expo notifications
             * service instead, which will later send the notifications to the users */
        });
    async function sendPushNotification() {
        console.log("send notification")


        // const message = {
        //     to: 'cZxPu48FQGmGyWtrvqes7K:APA91bFLV2NhfQB2aHa1tSK_UbN2XEhN6YyQ0vwwQWx2Jot-MBT34u-5dtcMfPw4s-Ip8q8fYlugjJZ59_vNw2u4Pd7E8BDfa-4fFn3HvNDlBeYIuKFEVpHpM9Z0PMQqTEJZLn_g1425',
        //     sound: 'default',
        //     title: "\uD83D\uDCE7 Urgent! Urgent! Urgent! Urgent! Urgent! Second user",
        //     body: "jajajaja",
        //     data: { second_user_id: 'seconduserId' , user_id: 'userId'},
        //     priority: 'high', //to make sure notification is delivered as fast as possible. see documentation for more details
        // };

        // await fetch('https://exp.host/--/api/v2/push/send', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Accept-encoding': 'gzip, deflate',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(message),
        // });
        // await fetch('https://fcm.googleapis.com/fcm/send', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: 'key=AAAA8hOJMrs:APA91bGmRkxhvQsMBiSWu8l33W9vA97PSqebtHo4xUIrpy440bNoI98PZ_jfRMzZqK5vW9pY_wuzI25xA4Dkckjae1C0ALwGBbJD50McIt58G3TwKz8SANcpsRo7yC-B5jNVZC5MtB31',
        //     },
        //     body: JSON.stringify({
        //         to: 'cZxPu48FQGmGyWtrvqes7K:APA91bFLV2NhfQB2aHa1tSK_UbN2XEhN6YyQ0vwwQWx2Jot-MBT34u-5dtcMfPw4s-Ip8q8fYlugjJZ59_vNw2u4Pd7E8BDfa-4fFn3HvNDlBeYIuKFEVpHpM9Z0PMQqTEJZLn_g1425',
        //         priority: 'normal',
        //         data: {
        //             experienceId: '@sumit_webronix/FindCarOwners',
        //             scopeKey: '@sumit_webronix/FindCarOwners',
        //             title: "\uD83D\uDCE7 You've got mail",
        //             message: 'Hello world! \uD83C\uDF10',
        //         },
        //     }),
        // });
    }
    const send = () => {
        console.log('l')
        let dataToSend = {user_id: "id"};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch('http://car.webronix.com/api/auth/send_notification', {
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
                if (responseJson.success === true) {
                    console.log(responseJson + "notification");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const onsubmitCarPlat = () => {
        if (!carplatnumber) {
            setErrorMessage("Please Enter Plat Number!")
            alert('Please fill car plat number');
            return;
        }
        let dataToSend = {carplatnumber: carplatnumber, user_id: userIdRole};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch('http://car.webronix.com/api/auth/get_user_by_car_plat_number', {
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
                setErrorMessage("");
                if (responseJson.success === true) {
                    console.log(responseJson.CarCount + "count");
                    if (responseJson.CountData === "data") {
                        navigation.navigate('PingScreen', {
                            CarIssueDetails: responseJson.CarIssue
                        });
                    } else {
                        if (responseJson.CarCount === "multi") {
                            navigation.navigate('CarListScreen', {
                                CarUserData: responseJson.car_owner_details
                            });
                        } else if (responseJson.CarCount === "single") {
                            navigation.navigate('IssuesOptionScreen', {
                                CarUserData: responseJson.car_owner_details[0]
                            });
                        } else {
                            navigation.navigate('Home');
                        }
                    }
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    const setNotificationToken = (token, userid) => {
        let dataToSend = {token: token, user_id: userid};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch('http://car.webronix.com/api/auth/save_token_for_notification', {
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
                // setLoading(false);
                console.log(responseJson);
                if (responseJson.success === true) {
                    console.log("done");
                }
            })
            .catch((error) => {
                //Hide Loader
                // setLoading(false);
                console.error(error);
            });
    };
    const buttonProfilePage = () => {
        navigation.navigate('ProfilePage');
    }
    const Home = () => {
        navigation.navigate('Home');
    }
    const Notification = () => {
        navigation.navigate('Notification');
    }
    const UserInfo = () => {
        navigation.navigate('UserInfo');
    }
    const Ping = () => {
        navigation.navigate('Ping');
    }
    const SecondUserNotification = () => {
        navigation.navigate('SecondUserNotification');
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.containerFab}>
                    <FAB
                        style={styles.fab}
                        large
                        icon={"star"}
                        color="#fff"
                        onPress={buttonProfilePage}
                    />
                </View>
                <Carousel data={dummyData}/>

                <RoundedButton
                    style={styles.addSubject}
                    onPress={send}
                    size={80}
                />

                <Text style={styles.titleOr}>OR</Text>
                <View style={styles.TextInputContainer}>

                    <TextInput
                        style={styles.textinputBox}
                        onChangeText={setCarPlatNumber}
                        value={carplatnumber}
                        autoCapitalize='characters'
                        underlineColorAndroid='transparent'
                        label="Plat Number"
                        keyboardType={"default"}
                        theme={{colors: {text: "#000"}}}
                        underlineColor={"#000"}
                        placeholderTextColor={"#000"}
                    />
                    {/*{errorMessage && <Text style={{color: "red"}}> {errorMessage} </Text>}*/}
                </View>

                             <TouchableOpacity
                                onPress={() => Notification()}>
                                <Text>Notification</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => Entry()}>
                                <Text>Entry</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => Ping()}>
                                <Text>Ping</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => SecondUserNotification()}>
                                <Text>SecondUserNotification</Text>
                            </TouchableOpacity>
                <View style={styles.ContainerSubmit}>

                    <TouchableOpacity onPress={() => onsubmitCarPlat()}
                                      style={styles.SubmitButton}>
                        <AntDesign style={{marginLeft: 20}} name="arrowright" size={40} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
    // return (
    //     <SafeAreaView style={{flex: 1}}>
    //         <View style={{flex: 1, padding: 16}}>
    //             <Loader loading={loading} />
    //
    //             <Pressable onPress={buttonProfilePage}>
    //                 <Text>buttonProfilePage</Text>
    //             </Pressable>
    //             <TextInput
    //                 style={styles.input}
    //                 onChangeText={setCarPlatNumber}
    //                 value={carplatnumber}
    //                 placeholder="Scan"
    //
    //             />
    //             <Button
    //                 onPress={onsubmitCarPlat}
    //                 title="Submit"
    //                 color="#841584"
    //             />
    //
    //             <Pressable onPress={buttonPress}>
    //                 <Text>Logout</Text>
    //             </Pressable>
    //             <TouchableOpacity
    //                 onPress={() => Home()}>
    //                 <Text>Home</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 onPress={() => Notification()}>
    //                 <Text>Notification</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 onPress={() => Entry()}>
    //                 <Text>Entry</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 onPress={() => Ping()}>
    //                 <Text>Ping</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 onPress={() => SecondUserNotification()}>
    //                 <Text>SecondUserNotification</Text>
    //             </TouchableOpacity>
    //
    //
    //
    //
    //             <Modal
    //                 animationType="fade"
    //                 transparent={true}
    //                 visible={modalVisible}
    //                 onRequestClose={() => {
    //                     Alert.alert("Modal has been closed.");
    //                     setModalVisible(!modalVisible);
    //                 }}
    //             >
    //                 <View style={styles.centeredView}>
    //                     <View style={styles.modalView}>
    //                         <Image
    //                             style={{width: width / 1.5, height: height / 1.5}}
    //                             source={require('../../Image/success.png')}
    //                             resizeMode={'cover'} // cover or contain its upto you view look
    //                         />
    //                         <Pressable
    //                             style={[styles.button, styles.buttonClose]}
    //                             onPress={() => setModalVisible(!modalVisible)}
    //                         >
    //                             <Text style={styles.textStyle}>Hide Modal</Text>
    //                         </Pressable>
    //                     </View>
    //                 </View>
    //             </Modal>
    //             <Pressable
    //                 style={[styles.button, styles.buttonOpen]}
    //                 onPress={() => setModalVisible(true)}
    //             >
    //                 <Text style={styles.textStyle}>Show Modal</Text>
    //             </Pressable>
    //         </View>
    //     </SafeAreaView>
    // );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: height / 3
    },
    addSubject: {
        marginLeft: 10,
        alignSelf: "center",
        width: height / 6,
        height: height / 6,
        backgroundColor: "#000",
        borderRadius: 100,
        marginTop: height / 30,
    },
    titleOr: {
        textAlign: "center",
        fontSize: 30,
        marginTop: height / 30,
    },
    textinputBox: {
        backgroundColor: "#f2f2f2",
        borderBottomColor: '#000',
        fontSize: 15,
    },
    TextInputContainer: {
        paddingLeft: 35,
        paddingRight: 35,
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
        marginTop: height / 25,
        marginRight: 35,
    },
    fab: {
        position: 'absolute',
        margin: height / 40,
        right: 0,
        top: 0,
        backgroundColor: "#000",
    },
    containerFab: {
        paddingTop: height / 10,
    }
});
export default HomeScreen;
