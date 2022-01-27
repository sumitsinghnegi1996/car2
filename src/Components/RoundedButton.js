import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {AntDesign, Feather, FontAwesome} from "@expo/vector-icons";
// import { Icon } from 'react-native-elements';
export const RoundedButton = ({
                                  style = {},
                                  textStyle = {},
                                  size,
                                  ...props
                              }) => {
    return (
        <TouchableOpacity
            style={[styles(125).radius, style]}
            onPress={props.onPress}
        >
          {/*  <Icon*/}
          {/*      name='mic'*/}
          {/*      type='ionicon'*/}
          {/*color='#fff'*/}
          {/*size={size}*/}
          {/*  style={styles.customsize} />*/}
            <FontAwesome name="microphone" size={size} color="white"  style={styles.customsize} />
        </TouchableOpacity>
    );
};

const styles = (size) =>
    StyleSheet.create({
        radius: {
            borderRadius: size / 2,
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#000",
            borderWidth: 2,
        },
        text: { color: "#fff", fontSize: 16 },
        customsize: {
            fontSize: 80
        }
    });
