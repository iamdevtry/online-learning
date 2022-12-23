import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';

import { useLessons, useSkills, useSkillName } from '../graphql/hooks';

import {
    IconButton,
    TextButton,
    VerticalCourseCard,
    LineDivider,
    CategoryCard,
    HorizontalCourseCard,
} from '../components';

import { COLORS, FONTS, SIZES, icons, images, dummyData } from '../constants';

import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Section = ({ containerStyle, title, onPresss, children }) => {
    return (
        <View
            style={{
                ...containerStyle,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        ...FONTS.h2,
                    }}
                >
                    {title}
                </Text>
                <TextButton
                    contentContainerStyle={{
                        width: 80,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary,
                    }}
                    label="See All"
                    onPress={onPresss}
                />
            </View>
            {children}
        </View>
    );
};

const Home = () => {
    const navigation = useNavigation();

    const { loading, error, skills } = useSkills();

    const getLessons = useLessons();
    const lessons = getLessons.lessons;
    const loadingLessons = getLessons.loading;
    const errorLoadingLessons = getLessons.error;

    if (loading || loadingLessons) return <Text>Loading...</Text>;
    if (error || errorLoadingLessons) return <Text>Error : {error.message}</Text>;

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

    const getNameSkill = (id) => {
        const { skill } = useSkillName(id);
        return skill;
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

    const renderCategories = () => {
        return (
            <Section title="Skills">
                <FlatList
                    horizontal
                    data={skills}
                    listKey="Skills"
                    keyExtractor={(item) => `Skills-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: SIZES.radius }}
                    renderItem={({ item, index }) => (
                        <CategoryCard
                            sharedElementPrefix="Home"
                            category={item}
                            containerStyle={{
                                marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index === skills.length - 1 ? SIZES.padding : 0,
                            }}
                            onPress={() =>
                                navigation.navigate('ListLesson', {
                                    category: item,
                                    sharedElementPrefix: 'Home',
                                })
                            }
                        />
                    )}
                />
            </Section>
        );
    };

    const renderPopularCourses = () => {
        return (
            <Section
                title="Lessons"
                containerStyle={{
                    marginTop: 30,
                }}
            >
                <FlatList
                    data={lessons}
                    listKey="Lessons"
                    scrollEnabled={false}
                    keyExtractor={(item) => `Lessons-${item.id}`}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                    }}
                    renderItem={({ item, index }) => (
                        <HorizontalCourseCard
                            containerStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index === 0 ? SIZES.radius : SIZES.padding,
                            }}
                            course={item}
                            onPress={() =>
                                navigation.navigate('DetailLesson', {
                                    selectedLesson: item,
                                })
                            }
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <LineDivider lineStyle={{ backroundColor: COLORS.gray20 }} />
                    )}
                />
            </Section>
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

                <LineDivider
                    lineStyle={{
                        marginVertical: SIZES.padding,
                    }}
                />

                {renderCategories()}

                {renderPopularCourses()}
            </ScrollView>
        </View>
    );
};

export default Home;
