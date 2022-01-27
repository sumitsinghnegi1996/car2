import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Camera, {
    Aspect,
    CaptureQuality,
    TorchMode,
} from 'react-native-openalpr'
const ZiyaPingScreen = () => {
    const [plate , setPlate] = useState('Scan a plate');

    const onPlateRecognized = ({ plate, confidence }) => {
        setPlate(plate);
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.preview}
                aspect={Aspect.fill}
                captureQuality={CaptureQuality.medium}
                country="us"
                onPlateRecognized={onPlateRecognized}
                plateOutlineColor="#ff0000"
                showPlateOutline
                zoom={0}
                torchMode={TorchMode.off}
                touchToFocus
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{plate}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        position: 'absolute',
        top: 100,
        left: 50,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    },
});
export default ZiyaPingScreen;