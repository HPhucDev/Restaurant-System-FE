import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import themes from "../themes";

const ButtonEditNumber = (props) =>{
    return(
        <TouchableOpacity
        style={styles.iconEditNumber}
        onPress={() => props.eventButton()}>
        <AntDesign name={props.name} size={24} color={themes.Colors.dark_grown} />
      </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    iconEditNumber: {
        marginHorizontal: themes.Spacing.medium,
      },
});
export default ButtonEditNumber;