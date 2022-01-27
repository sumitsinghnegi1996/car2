import React, {useEffect, useState} from 'react';
import {View, Button, Text, SafeAreaView, Pressable, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Loader from "../Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
const CarListScreen = ({route, navigation}) => {
    const {CarUserData} = route.params;
    console.log(CarUserData);
    const [CarOwnerDetailArray, setCarOwnerDetailArray] = useState([]);
    const [CarOwnerDetails, setCarOwnerDetails] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCarOwnerDetailArray(CarUserData);
    }, [CarUserData]);

    // if(CarUserData.car_owner_details && CarUserData.car_owner_details.length > 0){
    //     setCarOwnerDetails(CarUserData.car_owner_details);
    // }
    // console.log(CarOwnerDetails + "----");
    // CarOwnerDetailArray.map((userData) => {
    //     console.log(userData);
    //     setCarOwnerDetails(userData);
    // });
    // const buttonPress = () => {
    //     AsyncStorage.clear();
    //     navigation.replace('Auth');
    // };
    // AsyncStorage.getItem("userId").then((value) => {
    //     setUserId(value);
    // })
    //     .then(res => {
    //         //do something else
    //     });
    const onsubmitCarPlat = () => {
        console.log(carplatnumber);
        let dataToSend = {carplatnumber: carplatnumber, user_id: userId};
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
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                if (responseJson.success === true) {
                    navigation.navigate('IssuesOptionScreen', {
                        CarUserData: responseJson.car_owner_details
                    });
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
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
    const Entry = () => {
        navigation.navigate('Entry');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, padding: 16}}>
                <Loader loading={loading}/>
                <Text style={styles.paragraph}>
                    Change code
                </Text>

                {CarOwnerDetailArray.map((item, key) => (
                    <TouchableOpacity key={key} onPress={() => navigation.navigate('IssuesOptionScreen', {
                        CarUserData: item
                    })}>
                    <Card>
                        <Card.Content>
                            <Title>{item.UserName}</Title>
                            <Paragraph>{item.UserCarNumber}</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
                    </Card>
                    </TouchableOpacity>)
                )}


            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default CarListScreen;