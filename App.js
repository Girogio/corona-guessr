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
import DashboardScreen from "./src/screens/homeFlow/DashboardScreen";
import LeaderboardScreen from "./src/screens/leaderboardFlow/LeaderboardScreen";
import ProfileScreen from "./src/screens/profileFlow/ProfileScreen";
import SubmitPredictionScreen from "./src/screens/homeFlow/SubmitPredictionScreen";
import TodaysPredictionScreen from "./src/screens/homeFlow/TodaysPredictionScreen";


import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useFonts} from "expo-font";

const mainStack = createBottomTabNavigator();
const loginStack = createStackNavigator();
const homeStack = createStackNavigator();
const preMainStack = createStackNavigator();
const leaderboardStack = createStackNavigator();
const profileStack = createStackNavigator();

import firebase from 'firebase/app'
import "firebase/auth";
import firebaseConfig from "./auth";
import ResetPasswordScreen from "./src/screens/profileFlow/ResetPasswordScreen";
import OptionsScreen from "./src/screens/profileFlow/OptionsScreen";
import {Image, StatusBar, View} from "react-native";
import {Video} from "expo-av";
import OnBoardingScreen from "./src/screens/homeFlow/OnBoardingScreen";
import * as Papa from "papaparse";
import AsyncStorage from "@react-native-async-storage/async-storage";


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    console.log('connected')

} else {
    firebase.app();
}

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


export function HomeStack() {
    return (
        <homeStack.Navigator screenOptions={{
            headerShown: false,
            headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            animationEnabled: true,
        }}>
            <homeStack.Screen name="Dashboard" component={DashboardScreen} options={{
                gestureDirection: 'horizontal', gestureEnabled: true
            }}/>
            <homeStack.Screen name="SubmitPrediction" component={SubmitPredictionScreen} options={{
                gestureDirection: 'horizontal', gestureEnabled: true
            }}/>
            <homeStack.Screen name="TodaysPredictions" component={TodaysPredictionScreen} options={{
                gestureDirection: 'horizontal', gestureEnabled: true
            }}/>
        </homeStack.Navigator>
    )
}

function LeaderboardStack() {
    return (
        <leaderboardStack.Navigator screenOptions={{
            headerShown: false,
            headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            animationEnabled: true,
        }}>
            <leaderboardStack.Screen name="Leaderboard" component={LeaderboardScreen} options={{
                gestureDirection: 'horizontal', gestureEnabled: true
            }}/>
        </leaderboardStack.Navigator>
    )


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
            <profileStack.Screen name="Settings" component={OptionsScreen} options={{
                gestureDirection: 'vertical', gestureEnabled: true
            }}/>
            <profileStack.Screen name="ResetPass" component={ResetPasswordScreen} options={{
                gestureDirection: 'vertical', gestureEnabled: true
            }}/>
        </profileStack.Navigator>
    )
}

function MainStack(first_timer) {
    return (
        <mainStack.Navigator initialRouteName={first_timer ? 'Home' : 'Tutorial'} screenOptions={({route}) => ({
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
            <mainStack.Screen name="Home" component={HomeStack} />
            <mainStack.Screen name="Leaderboard" component={LeaderboardStack}/>
            <mainStack.Screen name="Profile" component={ProfileStack} />
        </mainStack.Navigator>
    )
}

export default function App() {
    const video = React.useRef(null);
    const [firstTime, setFirstTime] = useState('')
    const [status, setStatus] = React.useState({});

    function PreMainStack() {
        return (
            <preMainStack.Navigator
                initialRouteName={!firstTime ? 'Tutorial' : 'MainStack'}
                screenOptions={{
                    headerShown: false,
                }}>
                <preMainStack.Screen name={'Tutorial'} component={OnBoardingScreen}/>
                <preMainStack.Screen name={'MainStack'} component={MainStack} options={{unmountOnBlur: true}}/>
            </preMainStack.Navigator>
        )
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@first_timer')
            if (value !== null) {
                setFirstTime(value)
            }
        } catch (e) {
            setFirstTime('true')
        }
    }

    useEffect(() => {
        getData().then()
        /*Get the cases ASAP*/
        Papa.parse('https://raw.githubusercontent.com/COVID19-Malta/COVID19-Cases/master/COVID-19%20Malta%20-%20Aggregate%20Data%20Set.csv', {
            dynamicTyping: true,
            header: true,
            download: true,
            transformHeader(header: string, index: number): string {
                return header.replace(" ", "_")
            },
            complete: function (results) {

                let path = 'statistics/' + results.data[results.data.length - 2].Date.replace(/\//g, "-") + '/new_cases'
                firebase.database().ref(path).set(results.data[results.data.length - 2].New_Cases).then()
            }
        })
    })

    const [currentUser, setCurrentUser] = React.useState(null)
    firebase.auth().onAuthStateChanged(user => {
        setCurrentUser(user)
        getData().then()
    });


    let [fontsLoaded] = useFonts({
        'SFPro-Light': require('./assets/fonts/SFPro-Light.ttf'),
        'Georgia-Regular': require('./assets/fonts/Georgia-Regular.ttf'),
        'Georgia-Bold': require('./assets/fonts/Georgia-Bold.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
    });


    return (
        <NavigationContainer>
            {!status.didJustFinish ? (
                <View style={{backgroundColor: '#0c0c0c', flex: 1}}>
                    <StatusBar style="light"/>

                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <Video source={require('./assets/images/GuessyaAnimSplashscreen.mp4')}
                               style={{
                                   height: 1080,
                                   width: 1920,
                                   scaleX: 0.15,
                                   scaleY: 0.15,
                                   alignSelf: 'center',
                                   marginBottom: 80
                               }}
                               controls={false}
                               ref={video}

                               onPlaybackStatusUpdate={status => setStatus(() => status)}
                               onLoad={() => video.current.playAsync()}
                               resizeMode="stretch"
                        />
                    </View>

                    <Image

                        source={require('./assets/images/devlabel.png')}
                        style={{height: 37, width: 96, alignSelf: 'center', marginBottom: 80}}/>
                </View>

            ) : (currentUser) ? (PreMainStack()) : (LoginStack())}
        </NavigationContainer>
    )

}
