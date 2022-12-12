import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';

import { SharedElement } from 'react-navigation-shared-element';
import { IconButton, HorizontalCourseCard, LineDivider } from '../../components';
import { COLORS, FONTS, SIZES, images, icons, dummyData } from '../../constants';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = 250;

const ListLesson = ({ navigation, route }) => {
    const { category, sharedElementPrefix } = route.params;

    const flatListRef = React.useRef();
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const headerSharedValue = useSharedValue(80);

    const renderHeader = () => {
        const inputRange = [0, HEADER_HEIGHT - 50];
        headerSharedValue.value = withDelay(500, withTiming(0, { duration: 500 }));

        const headerFadeAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
            };
        });

        const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateY: headerSharedValue.value,
                    },
                ],
            };
        });

        const headerHeightAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(
                    scrollY.value,
                    inputRange,
                    [HEADER_HEIGHT, 120],
                    Extrapolate.CLAMP
                ),
            };
        });

        const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(
                            scrollY.value,
                            inputRange,
                            [0, 200],
                            Extrapolate.CLAMP
                        ),
                    },
                ],
            };
        });

        const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(
                            scrollY.value,
                            inputRange,
                            [50, 130],
                            Extrapolate.CLAMP
                        ),
                    },
                ],
            };
        });

        return (
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 250,
                        overflow: 'hidden',
                    },
                    headerHeightAnimatedStyle,
                ]}
            >
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Image
                        source={images.bg_1}
                        resizeMode="cover"
                        style={{
                            height: '100%',
                            width: '100%',
                            borderBottomLeftRadius: 60,
                        }}
                    />
                </SharedElement>
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            top: -80,
                            left: 0,
                            right: 0,
                        },
                        headerShowOnScrollAnimatedStyle,
                    ]}
                >
                    <Text style={{ textAlign: 'center', color: COLORS.white, ...FONTS.h2 }}>
                        {category?.name}
                    </Text>
                </Animated.View>
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            bottom: 70,
                            left: 30,
                        },
                        headerHideOnScrollAnimatedStyle,
                    ]}
                >
                    <SharedElement
                        id={`${sharedElementPrefix}-CategoryCard-Name-${category?.id}`}
                        style={[StyleSheet.absoluteFillObject]}
                    >
                        <Text
                            style={{
                                position: 'absolute',
                                color: COLORS.white,
                                ...FONTS.h1,
                            }}
                        >
                            {category?.name}
                        </Text>
                    </SharedElement>
                </Animated.View>
                <Animated.View style={headerFadeAnimatedStyle}>
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            tintColor: COLORS.black,
                        }}
                        containerStyle={{
                            position: 'absolute',
                            top: 40,
                            left: 20,
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: COLORS.white,
                        }}
                        onPress={() => {
                            if (scrollY.value > 0 && scrollY.value < 200) {
                                flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
                                setTimeout(() => {
                                    headerSharedValue.value = withTiming(
                                        80,
                                        { duration: 500 },
                                        () => {
                                            runOnJS(navigation.goBack)();
                                        }
                                    );
                                }, 100);
                            } else {
                                navigation.goBack();
                            }
                        }}
                    />
                </Animated.View>
                <Animated.Image
                    source={images.mobile_image}
                    resizeMode="contain"
                    style={[
                        {
                            position: 'absolute',
                            right: 40,
                            bottom: -40,
                            width: 100,
                            height: 200,
                        },
                        headerFadeAnimatedStyle,
                        headerTranslateAnimatedStyle,
                        headerHideOnScrollAnimatedStyle,
                    ]}
                />
            </Animated.View>
        );
    };

    const renderResults = () => {
        return (
            <AnimatedFlatList
                ref={flatListRef}
                data={dummyData.courses_list_2}
                keyExtractor={(item) => `Results-${item.id}`}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                keyboardDismissMode="on-drag"
                ListHeaderComponent={
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 270,
                            marginBottom: SIZES.base,
                        }}
                    >
                        <Text
                            style={{
                                flex: 1,
                                ...FONTS.body3,
                            }}
                        >
                            5,760 results
                        </Text>
                        <IconButton
                            icon={icons.filter}
                            iconStyle={{
                                width: 20,
                                height: 20,
                            }}
                            containerStyle={{
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                backgroundColor: COLORS.primary,
                            }}
                        />
                    </View>
                }
                renderItem={({ item, index }) => (
                    <HorizontalCourseCard
                        course={item}
                        containerStyle={{
                            marginVertical: SIZES.padding,
                            marginTop: index === 0 ? SIZES.radius : SIZES.padding,
                        }}
                        onPress={() =>
                            navigation.navigate('DetailLesson', { selectedCourse: item })
                        }
                    />
                )}
                ItemSeparatorComponent={() => (
                    <LineDivider lineStyle={{ backgroundColor: COLORS.gray20 }} />
                )}
            />
        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderResults()}
            {renderHeader()}
        </View>
    );
};

ListLesson.sharedElements = (route, otherRoute, showing) => {
    if (otherRoute.name === 'Dashboard') {
        const { category, sharedElementPrefix } = route.params;
        return [
            {
                id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`,
            },
            {
                id: `${sharedElementPrefix}-CategoryCard-Name-${category?.id}`,
            },
        ];
    }
};

export default ListLesson;
