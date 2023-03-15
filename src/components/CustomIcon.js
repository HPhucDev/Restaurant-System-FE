import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import themes from '../themes';
const CustomIcon = (props) => {
    return (
      <Icon
        name={props.name}
        size={28}
        color={props.focused ? themes.Colors.primary : themes.Colors.dark_gray}
      />
    );
};
export default CustomIcon;