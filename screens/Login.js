import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SIZES, FONTS, COLORS } from '../constants';
import { TextButton } from '../components';
import { useNavigation } from '@react-navigation/native';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutation';
import { getErrorMsg } from '../utils/helperFuncs';
import { useAuthContext } from '../services/auth';

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const { user, setUser } = useAuthContext();
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        onError: (err) => {
            setErrorMsg(getErrorMsg(err));
        },
    });

    useEffect(() => {
        if (user) {
            if (user._z) {
                navigation.navigate('Dashboard');
            }
        }
    });

    const validateForm = () => {
        if (username === '') {
            setErrorMsg('Username is required');
            return false;
        }
        if (password === '') {
            setErrorMsg('Password is required');
            return false;
        }
        return true;
    };

    const handleSignIn = () => {
        if (validateForm) {
            loginUser({
                variables: { username, password },
                update: (_, { data }) => {
                    setUser(data.login);
                    navigation.navigate('Dashboard');
                    setUsername('');
                    setPassword('');
                    setErrorMsg(null);
                },
            });
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.primary3,
            }}
        >
            <Text style={{ fontSize: 18, marginVertical: 2, color: 'white' }}>Welcome to</Text>

            <Text
                style={{
                    fontSize: 32,
                    lineHeight: 38,
                    color: '#63E6E2',
                    fontWeight: '800',
                }}
            >
                G2English
            </Text>

            <TextInput
                style={{
                    width: SIZES.width * 0.8,
                    ...FONTS.h3,
                    backgroundColor: 'transparent',
                    borderColor: COLORS.white,
                    borderStyle: 'solid',
                    borderWidth: 2,
                    padding: 10,
                    borderRadius: SIZES.radius,
                    color: COLORS.white,
                    marginVertical: 10,
                }}
                placeholder="Username"
                placeholderTextColor={COLORS.gray50}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={{
                    width: SIZES.width * 0.8,
                    ...FONTS.h3,
                    backgroundColor: 'transparent',
                    borderColor: COLORS.white,
                    borderStyle: 'solid',
                    borderWidth: 2,
                    padding: 10,
                    borderRadius: SIZES.radius,
                    color: COLORS.white,
                    marginVertical: 10,
                }}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor={COLORS.gray50}
                onChangeText={(text) => setPassword(text)}
            />
            <TextButton
                label="You don't have account? Sign Up..."
                contentContainerStyle={{
                    marginVertical: 10,
                    backgroundColor: 'transparent',
                }}
                labelStyle={{
                    ...FONTS.body4,
                }}
            />
            <TextButton
                label="Sign In"
                contentContainerStyle={{
                    width: SIZES.width * 0.8,
                    padding: SIZES.base,
                    borderRadius: SIZES.radius,
                    marginVertical: 10,
                }}
                onPress={handleSignIn}
            />
            <ActivityIndicator animating={loading} size="large" color={COLORS.primary} />
            {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
        </View>
    );
};

export default Login;
