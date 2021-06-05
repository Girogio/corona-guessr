import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators,  HeaderStyleInterpolators } from '@react-navigation/stack';

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";


const loginStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <loginStack.Navigator screenOptions={{
                headerShown: false,
                headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                animationEnabled:true,
            }}>
                <loginStack.Screen name="Register" component={RegisterScreen} options={{
                    gestureDirection:'horizontal',gestureEnabled:true
                }}/>
                <loginStack.Screen name="Login" component={LoginScreen} options={{
                    gestureDirection:'horizontal',gestureEnabled:true
                }}/>
            </loginStack.Navigator>
        </NavigationContainer>
    );
}
