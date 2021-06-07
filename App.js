import React, {useState, useEffect} from "react";

import {NavigationContainer} from '@react-navigation/native';
import {
    createStackNavigator,
    CardStyleInterpolators,
    HeaderStyleInterpolators
} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from "./src/screens/loginFlow/LoginScreen";
import RegisterScreen from "./src/screens/loginFlow/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/loginFlow/ForgotPasswordScreen";
import MySplashScreen from "./src/screens/MySplashScreen";
import DashboardScreen from "./src/screens/homeFlow/DashboardScreen";
import LeaderboardScreen from "./src/screens/leaderboardFlow/LeaderboardScreen";
import ProfileScreen from "./src/screens/profileFlow/ProfileScreen";
import SubmitPredictionScreen from "./src/screens/homeFlow/SubmitPredictionScreen";

``
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";
import SettingsScreen from "./src/screens/profileFlow/SettingsScreen";

const Tab = createBottomTabNavigator();
const loginStack = createStackNavigator();
const homeStack = createStackNavigator();
const profileStack = createStackNavigator();

function LoginStack() {
    return (
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
    )
}

function HomeStack() {
    return (
        <homeStack.Navigator screenOptions={{
            headerShown: false,
            headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            animationEnabled: true,
        }}>
            <loginStack.Screen name="Dashboard" component={DashboardScreen} options={{
                gestureDirection: 'horizontal', gestureEnabled: true
            }}/>
            <loginStack.Screen name="SubmitPrediction" component={SubmitPredictionScreen} options={{
                gestureDirection: 'horizontal', gestureEnabled: true
            }}/>
        </homeStack.Navigator>)
}

function ProfileStack() {
    return (
        <profileStack.Navigator screenOptions={{
            headerShown: false,
            headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            animationEnabled: true,
        }}>
            <profileStack.Screen name="Profile" component={ProfileScreen} options={{
                gestureDirection: 'horizontal', gestureEnabled: true
            }}/>
            <profileStack.Screen name="Settings" component={SettingsScreen} options={{
                gestureDirection: 'vertical', gestureEnabled: true
            }}/>
        </profileStack.Navigator>
    )
}

function MainStack() {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home-filled' : 'home-filled';
                } else if (route.name === 'Leaderboard') {
                    iconName = focused ? 'bar-chart' : 'bar-chart';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                }

                // You can return any component that you like here!
                return <MaterialIcons name={iconName} size={size} color={color}/>;
            },
        })}
                       tabBarOptions={{
                           style: {
                               width: '100%',
                               height: 70,
                               alignItems: 'center',
                           },
                           tabStyle: {
                               paddingTop: 10
                           },
                           labelStyle: {
                               marginBottom: 15,
                               letterSpacing: 0.5,
                               fontFamily: 'SFPro-Light'
                           },
                           activeTintColor: '#10C9F9',
                           inactiveTintColor: 'white',
                           inactiveBackgroundColor: '#242632',
                           activeBackgroundColor: '#242632'
                       }}>
            <Tab.Screen name="Home" component={HomeStack}/>
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen}/>
            <Tab.Screen name="Profile" component={ProfileStack}/>
        </Tab.Navigator>
    )
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])

    let [fontsLoaded] = useFonts({
        'SFPro-Light': require('./assets/fonts/SFPro-Light.ttf'),
        'ProximaNova-Bold': require('./assets/fonts/ProximaNova-Bold.ttf'),
        'ProximaNova-Regular': require('./assets/fonts/ProximaNova-Regular.ttf'),
        'ProximaNova-SemiBold': require('./assets/fonts/ProximaNova-SemiBold.otf'),
        'Georgia-Regular': require('./assets/fonts/Georgia-Regular.ttf'),
        'Georgia-Bold': require('./assets/fonts/Georgia-Bold.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <NavigationContainer>
                {isLoading ? (<MySplashScreen/>) : (MainStack())}
            </NavigationContainer>
        )
    }
}
