import React from 'react'
import {View, StyleSheet} from 'react-native'
import Carousel from '../component/Carousel'
import { dummyData } from '../data/Data'
import {RoundedButton} from "../src/Components/RoundedButton";


const Home = ({navigation}) =>{
    return (
        <View>
            <Carousel data = {dummyData}/>

            <RoundedButton
                style={styles.addSubject}
                size={50}
                title="SCAN"
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    addSubject: { marginLeft: 10, alignSelf: "center"},
});