import * as React from 'react';
import { Text, View,Image ,TextInput, Dimensions,StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Card , RadioButton } from 'react-native-paper';
import {Icon} from 'react-native-elements';
const {width, height} = Dimensions.get('window');
export default function App() {
    const [checked, setChecked] = React.useState('');
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState("h");
    return (
        <View style={styles.container}>

            <View style={{flexDirection: "row",alignItems:'center',marginBottom:30,marginTop: 10,}}>
                <View style={{width: 50,height: 50,marginRight: 15, borderRadius: 100,padding: 10,backgroundColor: '#ccc',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Image style={{width: 40,height: 40,  }} source={require('./assets/user.png')} resizeMode={'cover'} // cover or contain its upto you view look
                    />
                </View>

                <View style={{display: 'block',}}>
                    <Text style={{textTransform: 'uppercase',display:'block',fontWeight:'bold'}}>sumit singh negi</Text>
                    <Text>hi i m sumit singh negi</Text>
                </View>
            </View>
            <Image
                style={{width: 300, height: 300, marginLeft: 'auto',marginRight: 'auto',marginBottom: 10,}}
                source={require('./assets/second-user.jpg')}
                resizeMode={'cover'} // cover or contain its upto you view look
            />
            <Text style={{textAlign: 'left'}}>You can add anyone from your team to this group, and they can test builds using the TestFlight app.</Text>
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
                    <Text style={{fontSize: 15, color: "#fff", width: 'auto'}}>Lorem ipsum dolor sit amet</Text>
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
                    <Text style={{fontSize: 15, color: "#fff"}}>Lorem ipsum dolor sit amet</Text>
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
                    <Text style={{fontSize: 15, color: "#fff"}}>Lorem ipsum dolor sit amet</Text>
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
                    <Icon
                        name='arrow-forward-outline'
                        type='ionicon'
                        color='#fff'
                        size={40}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        padding: 8,
        minWidth: 320,
        maxWidth: 375,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    LabelName: {
        backgroundColor: "#000",
        width: 250,
        paddingTop: 14,
        paddingRight: 20,
        paddingBottom: 14,
        paddingLeft: 20,
        borderRadius: 30,
        marginLeft: 6,
    },
    input: {
        borderColor: "#000",
        width: 250,
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
    }
});
