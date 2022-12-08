import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';

import { IconButton, TextButton, VerticalCourseCard } from '../components';

import { COLORS, FONTS, SIZES, icons, images, dummyData } from '../constants';

import { FlatList } from 'react-native-gesture-handler';

const Home = () => {
    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center',
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h2 }}>Hello, Devtry</Text>
                    <Text style={{ color: COLORS.gray50, ...FONTS.body3 }}>
                        Thursday, 8th Dec 2022
                    </Text>
                </View>
                <IconButton icon={icons.notification} iconStyle={{ tintColor: COLORS.black }} />
            </View>
        );
    };

    const renderStartLearning = () => {
        return (
            <ImageBackground
                source={images.featured_bg_image}
                style={{
                    alignItems: 'flex-start',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 15,
                }}
                imageStyle={{
                    borderRadius: SIZES.radius,
                }}
            >
                <View>
                    <Text style={{ color: COLORS.white, ...FONTS.body2 }}>HOW TO</Text>
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                        Make your brand more visible with our checklist
                    </Text>
                    <Text style={{ marginTop: SIZES.radius, color: COLORS.white, ...FONTS.body4 }}>
                        By Devtry
                    </Text>
                </View>
                <Image
                    source={images.start_learning}
                    style={{ width: '100%', height: 110, marginTop: SIZES.padding }}
                />
                <TextButton
                    label="Start learning"
                    contentContainerStyle={{
                        height: 40,
                        paddingHorizontal: SIZES.padding,
                        borderRadius: 20,
                        backgroundColor: COLORS.white,
                    }}
                    labelStyle={{
                        color: COLORS.black,
                    }}
                />
            </ImageBackground>
        );
    };

    const renderCourses = () => {
        return (
            <FlatList
                horizontal
                data={dummyData.courses_list_1}
                listKey="Courses"
                keyExtractor={(item) => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginTop: SIZES.padding }}
                renderItem={({ item, index }) => (
                    <VerticalCourseCard
                        containerStyle={{
                            marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                            marginRight:
                                index === dummyData.courses_list_1.length - 1 ? SIZES.padding : 0,
                        }}
                        course={item}
                    />
                )}
            />
        );
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 150,
                }}
                showsVerticalScrollIndicator={false}
            >
                {renderStartLearning()}

                {renderCourses()}
            </ScrollView>
        </View>
    );
};

export default Home;
