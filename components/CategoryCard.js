import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';
import { SharedElement } from 'react-navigation-shared-element';

import bg_1 from '../assets/images/bg_1.png';
import bg_2 from '../assets/images/bg_2.png';
import bg_3 from '../assets/images/bg_3.png';
import bg_4 from '../assets/images/bg_4.png';
import bg_5 from '../assets/images/bg_5.png';
import bg_6 from '../assets/images/bg_6.png';

const categoryThumbnails = [
    { id: 1, thumbnail: bg_1 },
    { id: 2, thumbnail: bg_2 },
    { id: 3, thumbnail: bg_3 },
    { id: 4, thumbnail: bg_4 },
    { id: 5, thumbnail: bg_5 },
    { id: 6, thumbnail: bg_6 },
];
const randomCategoryBackground = () => {
    const random = Math.floor(Math.random() * 6);
    return categoryThumbnails[random].thumbnail;
};

const CategoryCard = ({ sharedElementPrefix, category, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                height: 150,
                width: 200,
                ...containerStyle,
            }}
            onPress={onPress}
        >
            <SharedElement
                id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                <Image
                    source={randomCategoryBackground()}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: SIZES.radius,
                    }}
                />
            </SharedElement>
            <View
                style={{
                    position: 'absolute',
                    left: 5,
                    bottom: 50,
                }}
            >
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Name-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Text
                        style={{
                            position: 'absolute',
                            color: COLORS.white,
                            ...FONTS.h2,
                        }}
                    >
                        {category?.name}
                    </Text>
                </SharedElement>
            </View>
        </TouchableOpacity>
    );
};

//              <ImageBackground
//                 // source={category?.thumbnail}
//                 source="22"
//                 resizeMode="cover"
//                 style={{
//                     height: 150,
//                     width: 200,
//                     paddingVertical: SIZES.padding,
//                     paddingHorizontal: SIZES.radius,
//                     justifyContent: 'flex-end',
//                     ...containerStyle,
//                 }}
//                 imageStyle={{
//                     borderRadius: SIZES.radius,
//                 }}
//             >
//                 <Text
//                     style={{
//                         color: COLORS.white,
//                         ...FONTS.h2,
//                     }}
//                 >
//                     {category?.name}
//                 </Text>
//             </ImageBackground>

export default CategoryCard;
