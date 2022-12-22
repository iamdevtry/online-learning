import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    Keyboard,
} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';

import { IconButton, LineDivider } from '../components';
import { COLORS, FONTS, SIZES, icons, constants } from '../constants';

const Profile = ({ navigation, route }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

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

    const renderHeader = () => {
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

    const renderVideoSection = () => {
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
                        uri: 'https://cdn.filestackcontent.com/vLqt7InGQNW5qLB99n8c',
                    }}
                    posterSource={{
                        uri: 'https://cdn.filestackcontent.com/vLqt7InGQNW5qLB99n8c',
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
            </View>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderHeader()}
            {renderVideoSection()}
        </SafeAreaView>
    );
};

export default Profile;
