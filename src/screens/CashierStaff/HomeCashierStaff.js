import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import StatusBarCustom from '../../components/StatusBarCustom';
import {TitleBar} from '../../components/TitleBar';

const HomeCashierStaff = () =>{
    return(
        <SafeAreaView style={styles.container}>
            <StatusBarCustom/>
            <TitleBar/>
        </SafeAreaView>
    )
}
const styles =  StyleSheet.create({
    container:{
        flex: 1,
    }
})
export default HomeCashierStaff;