import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './services/auth';
import apolloClient from './apolloClient';

import { Easing } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useFonts } from 'expo-font';
import MainLayout from './screens/MainLayout';
import Login from './screens/Login';
import ListLesson from './screens/Lesson/ListLesson';
import DetailLesson from './screens/Lesson/DetailLesson';

// const Stack = createNativeStackNavigator();
const Stack = createSharedElementStackNavigator();
const options = {
    gestureEnabled: true,
    transitionSpec: {
        open: {
            animation: 'timing',
            config: { duration: 400, easing: Easing.inOut(Easing.ease) },
        },
        close: {
            animation: 'timing',
            config: { duration: 400, easing: Easing.inOut(Easing.ease) },
        },
        cardStyleInterpolator: ({ current: { progress } }) => {
            return {
                cardStyle: {
                    opacity: progress,
                },
            };
        },
    },
};
const App = () => {
    const [fontsLoaded] = useFonts({
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return null;
    }

    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            useNativeDriver: true,
                            headerShown: false,
                        }}
                        initialRouteName={'Login'}
                        detachInactiveScreens={false}
                    >
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Dashboard" component={MainLayout} />
                        <Stack.Screen
                            name="ListLesson"
                            component={ListLesson}
                            options={() => options}
                        />
                        <Stack.Screen name="DetailLesson" component={DetailLesson} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
        </ApolloProvider>
    );
};

export default App;
