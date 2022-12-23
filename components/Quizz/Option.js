import { View, Text } from 'react-native';
import React from 'react';
import { FONTS, SIZES } from '../../constants';
import TextButton from '../TextButton';
const Option = ({ onPress }) => {
    return (
        <TextButton
            label="option"
            contentContainerStyle={{
                width: '80%',
                marginVertical: 10,
                borderRadius: SIZES.radius,
                padding: SIZES.padding,
                backgroundColor: 'white',
            }}
            labelStyle={{
                ...FONTS.body3,
                color: 'black',
            }}
            onPress={onPress}
        />
    );
};

export default Option;
