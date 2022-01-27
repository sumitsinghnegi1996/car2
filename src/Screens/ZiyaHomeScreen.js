import React from 'react'
import {
    View,
    StyleSheet,
    Platform,
    Text,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    KeyboardAvoidingView, TouchableWithoutFeedback
} from 'react-native'
import Carousel from "../../component/Carousel";
import {RoundedButton} from "../Components/RoundedButton";
import {dummyData} from "../../data/Data";
import {Appbar, FAB} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import {AntDesign, Ionicons} from '@expo/vector-icons';

const {width, height} = Dimensions.get('window')

const ZiyaHomeScreen = ({navigation}) => {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState("");
    const Entry = () => {
        navigation.navigate('Entry');
    }
    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.containerFab}>
                        <FAB
                            style={styles.fab}
                            large
                            color="#fff"
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <Carousel data={dummyData}/>

                    <RoundedButton
                        style={styles.addSubject}
                        size={80}
                    />

                    <Text style={styles.titleOr}>OR</Text>
                    <View style={styles.TextInputContainer}>

                        <TextInput
                            style={styles.textinputBox}
                            onChangeText={onChangeNumber}
                            autoCapitalize='characters'
                            value={number}
                            underlineColorAndroid='transparent'
                            label="Plat Number"
                            keyboardType={"default"}
                            theme={{ colors: { text: "#000" } }}
                            underlineColor={"#000"}
                            placeholderTextColor={"#000"}
                        />
                    </View>

                    <View style={styles.ContainerSubmit}>

                        <TouchableOpacity
                            style={styles.SubmitButton}>
                            {/*<Ionicons name="md-checkmark-circle" size={32} color="green" />*/}
                            <AntDesign name="arrowright" size={40} color="white" />
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingWrapper>
    )
}

export default ZiyaHomeScreen

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
        borderBottomWidth: 2,
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