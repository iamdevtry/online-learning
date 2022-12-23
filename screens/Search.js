import React from 'react';
import { View, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

import { TextButton, HorizontalCourseCard } from '../components';

import { COLORS, FONTS, SIZES, icons, dummyData } from '../constants';
import { useSearchLessons } from '../graphql/hooks';

const Search = () => {
    const navigation = useNavigation();
    const [keyword, setKeyword] = React.useState('');
    const scrollViewRef = React.useRef();
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const onFinish = () => {
        console.log('Received values of form: ', keyword);
    };

    const renderTopSearches = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                }}
            >
                <Text
                    style={{
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2,
                    }}
                >
                    Top Searches
                </Text>
                <FlatList
                    horizontal
                    data={dummyData.top_searches}
                    listKey="TopSearches"
                    keyExtractor={(item) => `TopSearches-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                    }}
                    renderItem={({ item, index }) => (
                        <TextButton
                            label={item.label}
                            contentContainerStyle={{
                                paddingVertical: SIZES.radius,
                                paddingHorizontal: SIZES.padding,
                                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                marginRight:
                                    index == dummyData.top_searches.length - 1 ? SIZES.padding : 0,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.gray10,
                            }}
                            labelStyle={{
                                color: COLORS.gray50,
                                ...FONTS.h3,
                            }}
                        />
                    )}
                />
            </View>
        );
    };

    const renderSearchBar = () => {
        const inputRange = [0, 55];
        const searchBarAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [55, 0], Extrapolate.CLAMP),
                opacity: interpolate(scrollY.value, inputRange, [1, 0], Extrapolate.CLAMP),
            };
        });

        return (
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: 50,
                        left: 0,
                        right: 0,
                        right: 0,
                        paddingHorizontal: SIZES.padding,
                        height: 50,
                    },
                    searchBarAnimatedStyle,
                ]}
            >
                <Shadow>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: SIZES.width - SIZES.padding * 2,
                            paddingHorizontal: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.white,
                        }}
                    >
                        <Image
                            source={icons.search}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.gray40,
                            }}
                        />

                        <TextInput
                            style={{
                                marginLeft: SIZES.base,
                                ...FONTS.h4,
                                flex: 1,
                            }}
                            placeholder="Search lesson..."
                            placeholderTextColor={COLORS.gray}
                            name="keyword"
                            onChangeText={(text) => setKeyword(text)}
                            onSubmitEditing={onFinish}
                        />
                    </View>
                </Shadow>
            </Animated.View>
        );
    };

    const renderBrowseCategories = () => {
        const { lessons, loading, error } = useSearchLessons(keyword);
        if (loading) return <ActivityIndicator size="large" color={COLORS.primary} />;
        if (error) return <Text>Error :(</Text>;
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                }}
            >
                <Text
                    style={{
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2,
                    }}
                >
                    Results
                </Text>
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
                />
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Animated.ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                    marginTop: 100,
                    paddingBottom: 300,
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
                onScroll={onScroll}
                onScrollEndDrag={(event) => {
                    if (
                        event.nativeEvent.contentOffset.y > 10 &&
                        event.nativeEvent.contentOffset.y < 50
                    ) {
                        scrollViewRef.current?.scrollTo({
                            x: 0,
                            y: 60,
                            animated: true,
                        });
                    }
                }}
            >
                {renderTopSearches()}

                {renderBrowseCategories()}
            </Animated.ScrollView>

            {renderSearchBar()}
        </View>
    );
};

Search.sharedElements = (route, otherRoute, showing) => {
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

export default Search;
