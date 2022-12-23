import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, SafeAreaView } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import RenderHtml from 'react-native-render-html';
import { SharedElement } from 'react-navigation-shared-element';
import { Video } from 'expo-av';

import { useLessonById, useSkillName } from '../../graphql/hooks';

import { IconButton } from '../../components';
import { COLORS, SIZES, FONTS, icons } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';

const HEADER_HEIGHT = 250;
const DetailLesson = ({ navigation, route }) => {
    const { selectedLesson } = route.params;
    const video = React.useRef(null);
    const { width } = useWindowDimensions();
    const [status, setStatus] = React.useState({});
    const { lesson, loading, error } = useLessonById(selectedLesson.id);
    const {
        skill,
        loading: loadingSkill,
        error: errorSkill,
    } = useSkillName(selectedLesson.skillId);

    const { sharedElementPrefix } = route.params;
    const flatListRef = React.useRef();
    const scrollY = useSharedValue(0);

    const onScroll = (event) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
    };

    const headerSharedValue = useSharedValue(80);

    const renderHeaderReadingLesson = () => {
        const inputRange = [0, HEADER_HEIGHT - 50];
        headerSharedValue.value = withDelay(500, withTiming(0, { duration: 500 }));

        const headerFadeAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
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

        if (loading || loadingSkill) {
            return <Text>Loading...</Text>;
        }
        if (error || errorSkill) {
            return <Text>Error...</Text>;
        }

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
                    id={`${sharedElementPrefix}-CategoryCard-Bg-${skill?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Image
                        source={{ uri: selectedLesson.thumbnail }}
                        resizeMode="cover"
                        style={{
                            height: '100%',
                            width: '100%',
                            borderBottomLeftRadius: 60,
                        }}
                    />
                </SharedElement>
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
            </Animated.View>
        );
    };

    const renderHeaderComponents = () => {
        return (
            <>
                {/* Back */}
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.primary,
                        }}
                        containerStyle={{
                            width: 80,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}
                        onPress={() => navigation.goBack()}
                        title="Back"
                        titleStyle={{
                            color: COLORS.primary,
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginLeft: 5,
                        }}
                    />
                </View>
            </>
        );
    };

    const renderHeaderVideoLesson = () => {
        return (
            <View
                style={{
                    height: 40,
                    flexDirection: 'row',
                    zIndex: 1,
                }}
            >
                {renderHeaderComponents()}
            </View>
        );
    };

    const renderHeader = () => {
        if (loadingSkill) {
            return <Text>Loading...</Text>;
        }
        if (errorSkill) {
            return <Text>Error...</Text>;
        }
        if (skill?.name === 'Reading') {
            return renderHeaderReadingLesson();
        } else {
            return renderHeaderVideoLesson();
        }
    };

    const renderVideoSection = () => {
        if (loadingSkill) {
            return <Text>Loading...</Text>;
        }
        if (errorSkill) {
            return <Text>Error...</Text>;
        }
        if (skill?.name === 'Listening' || skill?.name === 'Speaking') {
            return (
                <View
                    style={{
                        height: SIZES.height > 800 ? 220 : 200,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.gray90,
                    }}
                >
                    <Video
                        ref={video}
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        source={{
                            uri: lesson?.media[0]?.url,
                        }}
                        posterSource={{
                            uri: lesson?.media[0]?.url,
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                    />
                </View>
            );
        } else {
            return null;
        }
    };

    const renderContent = () => {
        if (loading) {
            return <Text>Loading...</Text>;
        }
        if (error) {
            return <Text>Error...</Text>;
        }
        return (
            <ScrollView
                style={{
                    marginTop: `${skill?.name === 'Reading' ? 50 : 10}%`,
                    marginBottom: SIZES.base,
                    flexDirection: 'column',
                    paddingHorizontal: SIZES.padding,
                }}
                showsVerticalScrollIndicator={false}
                ref={flatListRef}
                scrollEventThrottle={16}
                // onScroll={onScroll}
            >
                <Text style={{ textAlign: 'center', color: COLORS.black, ...FONTS.h2 }}>
                    {selectedLesson?.title}
                </Text>
                <Text style={{ paddingVertical: SIZES.padding, ...FONTS.body3 }}>
                    {selectedLesson?.shortDescription}
                </Text>
                <RenderHtml contentWidth={width} source={{ html: lesson.content }} />
            </ScrollView>
        );
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            {renderHeader()}
            {renderVideoSection()}
            {renderContent()}
        </SafeAreaView>
    );
};

export default DetailLesson;
