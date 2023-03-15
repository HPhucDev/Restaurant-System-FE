import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import themes from '../themes';
const SpinnerCustom = ({isVisible})=>{
    return(
        <Spinner
              visible={isVisible}
              color = {themes.Colors.primary}
              animation = {'slide'}
        />
    )
}
export default SpinnerCustom;