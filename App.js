import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './services/auth';
import apolloClient from './apolloClient';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import MainLayout from './screens/MainLayout';

const Stack = createNativeStackNavigator();

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
        // <NavigationContainer>
        //     <Stack.Navigator
        //         screenOptions={{
        //             headerShown: false,
        //         }}
        //         initialRouteName={'Dashboard'}
        //     >
        //         <Stack.Screen name="Dashboard" component={MainLayout} />
        //     </Stack.Navigator>
        // </NavigationContainer>

        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName={'Dashboard'}
                    >
                        <Stack.Screen name="Dashboard" component={MainLayout} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
        </ApolloProvider>
    );
};

export default App;
