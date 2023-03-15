import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TitleBar } from '../../../components/TitleBar';
import TopNavigationMenu from '../../../routers/TopNavigationMenu';
import themes from '../../../themes';

const ListFoodItem = (props) =>{
    return(
        <SafeAreaView style={styles.container}>
            <TitleBar name="Danh sách món ăn" eventButton={props.navigation.goBack}/>
            <TopNavigationMenu
                option='MANAGEMENT'
                tableName=''
            />
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.Colors.white,
    }
})
export default ListFoodItem;