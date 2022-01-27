import React from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity, SafeAreaView
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import {AntDesign} from "@expo/vector-icons";

const {width, height} = Dimensions.get('window')

const ZiyaNotification = () => {
    const [checked, setChecked] = React.useState('');
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState("h");
    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView>
                <View style={styles.container}>

                    <Image
                        style={{width: 50, height: 50}}
                        source={require('../../Image/success.png')}
                        resizeMode={'cover'} // cover or contain its upto you view look
                    />

                    <View style={styles.usertextMain}>
                        <Text style={styles.userName}>SUMIT SINGH NEGI</Text>
                        <Text style={styles.carNumber}>HR BV E3 3445</Text>
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
                            onChangeText={onChangeNumber}
                            value={number}
                            multiline={true}
                            keyboardType={"default"}
                            placeholder="useless placeholder"
                        />
                    </View>

                    <View style={styles.ContainerSubmit}>

                        <TouchableOpacity
                            style={styles.SubmitButton}>
                            {/*<Icon*/}
                            {/*    name='arrow-forward-outline'*/}
                            {/*    type='ionicon'*/}
                            {/*    color='#fff'*/}
                            {/*    size={40}*/}
                            {/*/>*/}
                            <AntDesign name="arrowright" size={40} color="white" />
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingWrapper>
    )
}
export default ZiyaNotification;

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