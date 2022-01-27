// Import React and Component
import React, {useState, useEffect} from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image
} from 'react-native';
import HomeScreen from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = ({navigation}) => {
    //State for ActivityIndicator animatione
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            //Check if userId is set or not
            //If not then send for Authentication
            //else send to Home Screen
            AsyncStorage.getItem('userId').then((value) =>
                navigation.replace(
                    value === null ? 'Auth' : 'HomeScreen'
                ),
            );
        }, 5000);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../Image/success.png')}
                style={{width: '90%', resizeMode: 'contain', margin: 30}}
            />
            <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
