import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "./src/screens/LoginScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import {Button} from "react-native";


const loginStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <loginStack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <loginStack.Screen name="Login" component={LoginScreen}  />
                <loginStack.Screen name="Welcome" component={WelcomeScreen} />
                <loginStack.Screen name="Register" component={RegisterScreen} />
            </loginStack.Navigator>
        </NavigationContainer>
    );
}
