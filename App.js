import React, {Component, useState} from "react";
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
    createStackNavigator,
    CardStyleInterpolators,
    HeaderStyleInterpolators
} from '@react-navigation/stack';

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import {Image, View} from "react-native";

const loginStack = createStackNavigator();


function splash() {
    return (
        <View style={{backgroundColor: '#0c0c0c', flex: 1}}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Image source={require('./assets/images/name-logo.png')}
                       style={{height: 71, width: 217, marginTop: 30}}/>
            </View>

            <Image source={require('./assets/images/devlabel.png')}
                   style={{height: 37, width: 96, alignSelf: 'center', marginBottom: 80}}/>

        </View>

    )
}


export default function App()
{

    return (
        <NavigationContainer>
            <loginStack.Navigator screenOptions={{
                headerShown: false,
                headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                animationEnabled: true,
            }}>
                <loginStack.Screen name="Register" component={RegisterScreen} options={{
                    gestureDirection: 'horizontal', gestureEnabled: true
                }}/>
                <loginStack.Screen name="Login" component={LoginScreen} options={{
                    gestureDirection: 'horizontal', gestureEnabled: true
                }}/>
                <loginStack.Screen name="ForgotPass" component={ForgotPasswordScreen} options={{
                    gestureDirection: 'horizontal', gestureEnabled: true
                }}/>
            </loginStack.Navigator>
        </NavigationContainer>
    )
}
