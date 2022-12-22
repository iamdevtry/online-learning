import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { COLORS } from '../constants';

const IconButton = ({ containerStyle, icon, iconStyle, onPress, title, titleStyle }) => {
    return (
        <TouchableOpacity
            style={{
                ...containerStyle,
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={{ width: 30, height: 30, tintColor: COLORS.white, ...iconStyle }}
            />
            {title && <Text style={{ ...titleStyle }}>{title}</Text>}
        </TouchableOpacity>
    );
};

export default IconButton;
