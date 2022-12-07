import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

import { FONTS, COLORS } from '../constants';

const TextButton = ({ contentContainerStyle, disable, label, labelStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...contentContainerStyle,
            }}
            disabled={disable}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle,
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default TextButton;
