import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Image, TextInput } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

import { COLORS, FONTS, SIZES, icons } from '../constants';
const Profile = () => {
    const scrollViewRef = React.useRef();
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    //dictionary
    const [word, setWord] = useState('');
    const [wordDetails, setWordDetails] = useState(null);
    const getWordDetail = (word) => {
        var config = {
            method: 'get',
            url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setWordDetails(response.data[0]);
                // console.log(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const onFinish = () => {
        // console.log('Received values of form: ', word);
        getWordDetail(word);
    };

    const soundPlay = (index) => {
        var audio = document.getElementById(`audio${index}`);
        audio.play();
    };
    //end dictionary

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
                <Text
                    style={{
                        ...FONTS.h2,
                        marginVertical: SIZES.base,
                    }}
                >
                    Dictionary
                </Text>
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
                            placeholder="Search word..."
                            placeholderTextColor={COLORS.gray}
                            name="word"
                            onChangeText={(text) => setWord(text)}
                            onSubmitEditing={onFinish}
                        />
                    </View>
                </Shadow>
            </Animated.View>
        );
    };

    const renderBrowseCategories = () => {
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
                    Browse Categories
                </Text>
                {wordDetails ? (
                    <View style={{ marginHorizontal: SIZES.padding }}>
                        <Text style={{ ...FONTS.h2 }}>
                            💡 Ý nghĩa của "{wordDetails.word}" trong tiếng Anh
                        </Text>
                        <Text style={{ ...FONTS.h3, marginVertical: SIZES.body4 }}>
                            ⭕️ Word: {wordDetails.word}
                        </Text>
                        {wordDetails.meanings.map((meaning, meaningIndex) => (
                            <View key={meaningIndex}>
                                <Text style={{ ...FONTS.h3, marginVertical: SIZES.body4 }}>
                                    ⭕️ Part Of Speech:
                                    {meaning.partOfSpeech}
                                </Text>
                                {meaning.definitions.map((definitionsItem, definitionsIndex) => (
                                    <View key={definitionsIndex}>
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                marginVertical: SIZES.body4,
                                                paddingHorizontal: 12,
                                            }}
                                        >
                                            🔸 {definitionsItem.definition}
                                        </Text>
                                        {definitionsItem.example && (
                                            <Text style={{ ...FONTS.body4, paddingHorizontal: 12 }}>
                                                ex: {definitionsItem.example}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text>Word not found</Text>
                )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Animated.ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                    marginTop: 140,
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
                {renderBrowseCategories()}
            </Animated.ScrollView>

            {renderSearchBar()}
        </View>
    );
};

export default Profile;
