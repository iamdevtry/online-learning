import { View, Text } from 'react-native';
import React from 'react';
import { FONTS, SIZES } from '../../constants';

const Question = () => {
    return (
        <View
            style={{
                width: '80%',
                height: '20%',
                backgroundColor: 'white',
                borderRadius: SIZES.radius,
                justifyContent: 'center',
                alignContent: 'center',
                paddingHorizontal: SIZES.padding,
                marginBottom: 20,
            }}
        >
            <Text style={{ ...FONTS.h2, marginBottom: 10 }}>Question</Text>
            <Text style={{ ...FONTS.body3 }}>
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s
            </Text>
        </View>
    );
};

export default Question;
