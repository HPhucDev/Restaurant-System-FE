import React from 'react';
import { StatusBar } from 'react-native';
import themes from '../themes';
const StatusBarCustom = () =>{
    return(
        <StatusBar backgroundColor={themes.Colors.light} />
    )
};
export default StatusBarCustom;