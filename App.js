// Import React and Component
import React, {useState} from 'react';
import 'react-native-gesture-handler';
// Import Navigators from React Navigation
import {NavigationContainer, useFocusEffect, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Notifications from "expo-notifications";
// Import Screens
import SplashScreen from './src/Screens/SplashScreen';
import Otp from './src/Screens/Otp';
import HomeScreen from './src/Screens/HomeScreen';
import LoginWithHome from "./src/Screens/LoginWithPhone";
import UserInfo from "./src/Screens/UserInfo";
import IssuesOptionScreen from "./src/Screens/IssuesOptionScreen";
import ProfilePage from "./src/Screens/ProfilePage";
import ZiyaNotification from "./src/Screens/ZiyaNotification";
import ZiyaHomeScreen from "./src/Screens/ZiyaHomeScreen";
import ZiyaEntry from "./src/Screens/ZiyaEntry";
import CarListScreen from "./src/Screens/CarListScreen";
import ZiyaPingScreen from "./src/Screens/ZiyaPingScreen";
import ZiyaSecondUserNotificationScreen from "./src/Screens/ZiyaSecondUserNotificationScreen";
import Home from "./screen/Home";
import SecondUserNotificationScreen from "./src/Screens/SecondUserNotificationScreen";
import PingScreen from "./src/Screens/PingScreen";
import { Ionicons } from '@expo/vector-icons';
import {Text} from "react-native";
import ProfileUpdate from "./src/Screens/ProfileUpdate";
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const Stack = createStackNavigator();
const navigationOptions = ({ navigation, screenProps }) => ({
    title:  'Header Title',
    headerLeft: <Icon name={'arrow-left'}
                      onPress={ () => { navigation.goBack() }} />,
    headerRight: <Icon name={'cog'}
                       onPress={ () => { navigation.navigate('Settings') }} />,
});
const Auth = () => {
    // Stack Navigator for Login Screen
    return (
        <Stack.Navigator initialRouteName="LoginWithHome">
            <Stack.Screen
                name="LoginWithHome"
                component={LoginWithHome}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

const App = () => {
    const [initialRoute, setInitialRoute] = useState('SplashScreen');
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                {/* SplashScreen */}
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    // Hiding header for Splash Screen
                    options={{headerShown: false}}
                />
                {/* Auth Navigator: Include Login */}
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{headerShown: false}}
                />
                {/* landing page */}
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    // Hiding header for Navigation Drawer
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="LoginWithHome"
                    component={LoginWithHome}
                    // Hiding header for Navigation Drawer
                    options={{headerShown: false}}
                />
                {/* otp page */}
                <Stack.Screen
                    name="OTP"
                    component={Otp}
                    // Hiding header for Navigation Drawer
                    options={{headerShown: false}}
                />
                {/* user info page */}
                <Stack.Screen
                    name="UserInfo"
                    component={UserInfo}
                    // Hiding header for Navigation Drawer
                    options={({ navigation }) => ({
                        title: "Setting",
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            color: 'black'
                        },
                        headerStyle: {
                            backgroundColor: "#f2f2f2",
                            borderBottomWidth: 0
                        },
                        headerTintColor: "#f2f2f2",
                        headerLeft: () => (
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black"
                                      onPress={ () => { navigation.goBack() }} />
                        ),
                    })}
                />
                {/* user Update page */}
                <Stack.Screen
                    name="ProfileUpdate"
                    component={ProfileUpdate}
                    // Hiding header for Navigation Drawer
                    options={({ navigation }) => ({
                        title: "ProfileUpdate",
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            color: 'black'
                        },
                        headerStyle: {
                            backgroundColor: "#f2f2f2",
                            borderBottomWidth: 0
                        },
                        headerTintColor: "#f2f2f2",
                        headerLeft: () => (
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black"
                                      onPress={ () => { navigation.goBack() }} />
                        ),
                    })}
                />
                {/* show issue lists page */}
                <Stack.Screen
                    name="IssuesOptionScreen"
                    component={IssuesOptionScreen}
                    // Hiding header for Navigation Drawer
                    options={({ navigation }) => ({
                        title: "Notification",
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            color: 'black'
                        },
                        headerStyle: {
                            backgroundColor: "#f2f2f2",
                            borderBottomWidth: 0
                        },
                        headerTintColor: "#f2f2f2",
                        headerLeft: () => (
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black"
                                      onPress={ () => { navigation.goBack() }} />
                        ),
                    })}
                />

                {/* show Profile page */}
                <Stack.Screen
                    name="ProfilePage"
                    component={ProfilePage}
                    // Hiding header for Navigation Drawer
                    options={({ navigation }) => ({
                        title: "Notification",
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            color: 'black'
                        },
                        headerStyle: {
                            backgroundColor: "#f2f2f2",
                            borderBottomWidth: 0
                        },
                        headerTintColor: "#f2f2f2",
                        headerLeft: () => (
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black"
                                      onPress={ () => { navigation.goBack() }} />
                        ),
                    })}
                />

                <Stack.Screen
                    name="CarListScreen"
                    component={CarListScreen}
                    // Hiding header for Navigation Drawer
                    options={({ navigation }) => ({
                        title: "Notification",
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            color: 'black'
                        },
                        headerStyle: {
                            backgroundColor: "#f2f2f2",
                            borderBottomWidth: 0
                        },
                        headerTintColor: "#f2f2f2",
                        headerLeft: () => (
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black"
                                      onPress={ () => { navigation.goBack() }} />
                        ),
                    })}
                />

                <Stack.Screen
                    name="Notification"
                    component={ZiyaNotification}
                    // Hiding header for Navigation Drawer
                    options={({ navigation }) => ({
                        title: "Notification",
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            color: 'black'
                        },
                        headerStyle: {
                            backgroundColor: "#f2f2f2",
                            borderBottomWidth: 0
                        },
                        headerTintColor: "#f2f2f2",
                        headerLeft: () => (
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black"
                                  onPress={ () => { navigation.goBack() }} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="SecondUserNotificationScreen"
                    component={SecondUserNotificationScreen}
                    // Hiding header for Navigation Drawer
                    options={({ navigation }) => ({
                        title: "Notification",
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            color: 'black'
                        },
                        headerStyle: {
                            backgroundColor: "#f2f2f2",
                            borderBottomWidth: 0
                        },
                        headerTintColor: "#f2f2f2",
                        headerLeft: () => (
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black"
                                      onPress={ () => { navigation.goBack() }} />
                        ),
                    })}
                />

                <Stack.Screen
                    name="PingScreen"
                    component={PingScreen}
                    // Hiding header for Navigation Drawer
                    options={({ navigation }) => ({
                        title: "Notification",
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            color: 'black'
                        },
                        headerStyle: {
                            backgroundColor: "#f2f2f2",
                            borderBottomWidth: 0
                        },
                        headerTintColor: "#f2f2f2",
                        headerLeft: () => (
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black"
                                      onPress={ () => { navigation.goBack() }} />
                        ),
                    })}
                />


                <Stack.Screen
                    name="Home"
                    component={ZiyaHomeScreen}
                    // Hiding header for Navigation Drawer
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Entry"
                    component={ZiyaEntry}
                    // Hiding header for Navigation Drawer
                    options={{headerShown: true}}
                />

                <Stack.Screen
                    name="Ping"
                    component={ZiyaPingScreen}
                    // Hiding header for Navigation Drawer
                    options={{headerShown: true}}
                />
                <Stack.Screen
                    name="SecondUserNotification"
                    component={ZiyaSecondUserNotificationScreen}
                    // Hiding header for Navigation Drawer
                    options={{headerShown: true}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;