import React, {useEffect, useState} from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import {Button, Text, Vibration, View} from 'react-native';
import useStable from "react-native-web/dist/modules/useStable";
import {RoundedButton} from "../Components/RoundedButton";
// status of the user
// show profile of the user
//ping timer and press button three times
// done finish
//yarn add react-countdown-circle-timer
const PingScreen = ({route, navigation}) => {

    const CarIssueDetails = route.params.CarIssueDetails;
    const [key, setKey] = useState(0);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isStarted, setStarted] = useState(false);
    const [carIssueDetailId , setCarIssueDetailId ] = useState();
    const [userDescriptionOne , setUserDescriptionOne ] = useState('');
    const [userStatusOne , setUserStatusOne ] = useState('');
    const [userIssuesOne , setUserIssuesOne ] = useState('');
    const [loading, setLoading] = useState(false);
    const [minutes, setMinutes] = useState(0.1);
    const [ping, setPing] = useState(0);

    useEffect(() => {
        setCarIssueDetailId(CarIssueDetails.car_issue_detail_id);
        setUserDescriptionOne(CarIssueDetails.description);
        setUserStatusOne(CarIssueDetails.status);
        setUserIssuesOne(CarIssueDetails.issues);
    });



    const onsubmitPing = () => {
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
                    if(responseJson.ping !== null){
                        console.log(responseJson.ping)
                        setPing(responseJson.ping);
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
                // onEnd={onEnd()}
            />


            {ping === '3'?   <Button
                disabled={true}
                title="Restart"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />  : <Button
                onClick={() => {
                   setStarted(true)
                    onsubmitPing();
                }}
                disabled={isButtonVisible}
                title="Restart Timer"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />}
            <Button
                onPress={onsubmitDone()}
                disabled={isButtonVisible}
                title="Done"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}
export default PingScreen;