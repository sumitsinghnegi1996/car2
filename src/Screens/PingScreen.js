import React, {useEffect, useState} from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import {Pressable, Text, TouchableOpacity, Vibration, View} from 'react-native';
import useStable from "react-native-web/dist/modules/useStable";
import {RoundedButton} from "../Components/RoundedButton";
// status of the user
// show profile of the user
//ping timer and press button three times
// done finish
//yarn add react-countdown-circle-timer
const PingScreen = ({route, navigation}) => {

    const CarIssueDetails = route.params.CarIssueDetails;
    const UserToken = route.params.UserToken;
    const [key, setKey] = useState(0);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isStarted, setStarted] = useState(false);
    const [carIssueDetailId, setCarIssueDetailId] = useState();
    const [userDescriptionOne, setUserDescriptionOne] = useState('');
    const [userStatusOne, setUserStatusOne] = useState('');
    const [userIssuesOne, setUserIssuesOne] = useState('');
    const [loading, setLoading] = useState(false);
    const [minutes, setMinutes] = useState(0.1);
    const [ping, setPing] = useState(0);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [secondUserResponseIssue, setSecondUserResponseIssue] = useState('');
    const [secondUserResponseDescription, setSecondUserResponseDescription] = useState('');
    useEffect(() => {
        setCarIssueDetailId(CarIssueDetails.car_issue_detail_id);
        setUserDescriptionOne(CarIssueDetails.description);
        setUserStatusOne(CarIssueDetails.status);
        setUserIssuesOne(CarIssueDetails.issues);
        setExpoPushToken(UserToken);

    });
    useEffect(() => {
        getPing(CarIssueDetails.car_issue_detail_id);
    }, [CarIssueDetails]);

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
    async function sendPushNotification() {
        console.log("send notification")
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: "\uD83D\uDCE7 Urgent! Urgent! Urgent! Urgent! Urgent! PING",
            body: "checked",
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
    const getPing = (val) => {
        console.log('ping' + val);
        let dataToSend = {carIssueDetailId: val};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch('http://car.webronix.com/api/auth/get_ping', {
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
                        console.log(responseJson.Pings + 'aaya')
                        setPing(responseJson.Pings.pings);
                    setSecondUserResponseIssue(responseJson.Pings.issue_option);
                    setSecondUserResponseDescription(responseJson.Pings.description);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    }
    const onsubmitPing = () => {
        sendPushNotification();
        console.log('hh');
        let dataToSend = {carIssueDetailId: carIssueDetailId};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch('http://car.webronix.com/api/auth/ping_the_user', {
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
                    if (responseJson.pings !== null) {
                        console.log(responseJson.pings)
                        setPing(responseJson.pings);
                    }
                    // navigation.navigate('Ping');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    }
    const onsubmitDone = () => {
console.log('fffffff');
    }

    const onEnd = async () => {
        try {
            const interval = setInterval(() => Vibration.vibrate(5000), 1000);
            setTimeout(() => {
                clearInterval(interval);
            }, 10000);
        } catch (error) {
            console.log(error);
        }

        setStarted(false);
        setMinutes(1);
    };
    return (

        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <RoundedButton
                minutes={minutes}
                isPaused={!isStarted}
                onPress={onsubmitDone}
            />

            <Text>{carIssueDetailId} - {ping} - {secondUserResponseIssue} - {secondUserResponseDescription}</Text>
            {ping !== 3 ? <Pressable onPress={() => {
                onsubmitPing();
            }}
                                     title="Done"
                                     color="#841584"
                                     accessibilityLabel="Learn more about this purple button">
                <Text>Restart Timer</Text>
            </Pressable>: <Pressable disabled={true}
                                     onPress={onsubmitDone}
                                       color="#000"
                                       accessibilityLabel="Learn more about this purple button">
                <Text>Restart</Text>
            </Pressable> }
            <Pressable onPress={onsubmitDone()}
                // disabled={isButtonVisible}
                       title="Done"
                       color="#841584"
                       accessibilityLabel="Learn more about this purple button">
                <Text>DONE</Text>
            </Pressable>
        </View>
    )
}
export default PingScreen;
