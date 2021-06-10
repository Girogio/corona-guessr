import React, {useEffect, useRef, useState} from "react";
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TouchableNativeFeedback, AppState,
} from "react-native";
import {Header} from 'react-native-elements'
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../assets/colors/Colors";
import firebase from "firebase/app";
import 'firebase/auth'


import {set, intervalToDuration,} from "date-fns";

import MyStyles from "../../../assets/styles/MyStyles";


export default function DashboardScreen({navigation}) {


    const appState = useRef(AppState.currentState);


    const [remaining, setRemaining] = useState({
        hours: '--',
        minutes: '--',
        seconds: '--',
    });

    const [userData, setUserData] = useState({
        date_created: '',
        displayName: '',
        email: '',
        rank: '',
        hasGuessed: true,
    });

    useEffect(() => {

        const now = new Date()
        const predictionUpdate = setInterval(() => {
            setRemainingTime().then({})
        }, 1000)

        const path = '/guesses/' + (now.getDate() + 1 < 10 ? '0' + now.getDate() + 1 : (now.getDate() + 1)) + '-' + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)) + '-' + now.getFullYear()

        firebase.database()
            .ref('users/' + firebase.auth().currentUser.uid)
            .on('value', snapshot => {
                const userStuff = {
                    date_created: snapshot.val().date_created,
                    displayName: snapshot.val().displayName,
                    email: snapshot.val().email,
                    rank: snapshot.val().rank,
                    hasGuessed: snapshot.child(path + '/hasGuessed').val() !== null,
                    achievements: snapshot.val().achievements,
                }
                setUserData(userStuff)
                AppState.addEventListener("change", handleAppStateChange);
                return () => AppState.removeEventListener("change", handleAppStateChange);
            });
    }, [])

    const handleAppStateChange = async (nextAppState) => {
        if (appState.current.match(/inactive|background/) &&
            nextAppState === "active") {
            await setRemainingTime();
        }
        appState.current = nextAppState;
    };

    const setRemainingTime = async () => {

        const now = new Date();
        const midnight = set(new Date(), {date: now.getDate() + 1, hours: 0, minutes: 0, seconds: 0})

        setRemaining(intervalToDuration({
                start: now,
                end: midnight
            }
        ));

    };

    return (
        <View style={MyStyles.container}>
            <StatusBar style="light"/>
            <Header backgroundColor={Colors.darkBackground}
                    centerContainerStyle={MyStyles.mainHeaderCenterContainer}

                    centerComponent={<Text style={MyStyles.mainHeaderText}>DASHBOARD</Text>}
                    containerStyle={MyStyles.mainHeaderContainer}
            />

            <Text style={styles.subtitle}>Welcome back,
                <Text style={styles.nameText}> {userData.displayName.split(" ")[0]}</Text>.
            </Text>
            <Image style={styles.maltaImage} source={require('../../../assets/images/MALTA.png')}/>
            {/*Button 1*/}
            <View style={{marginTop: 50, flexDirection: 'row'}}>
                {/*Button 1*/}
                <TouchableNativeFeedback

                    onPress={() => userData.hasGuessed ? null : navigation.navigate('SubmitPrediction')}>
                    <View style={styles.leftButtonContainer}>
                        <Text style={styles.buttonTitleText}>Your{'\n'}Prediction</Text>
                        <View style={styles.buttonStatusContainer}>
                            <MaterialCommIcon color='white' size={22}
                                              name={userData.hasGuessed ? 'clock-check' : 'clock-time-four'}/>
                            <Text
                                style={styles.buttonStatusText}>{
                                !userData.hasGuessed ?
                                    'Take a guess!'
                                    : (remaining.hours < 10 ? '0' + remaining.hours : remaining.hours)
                                    + ':' + (remaining.minutes < 10 ? '0' + remaining.minutes : remaining.minutes)
                                    + ':' + (remaining.seconds < 10 ? '0' + remaining.seconds : remaining.seconds)}</Text>
                        </View>
                        <View style={styles.divider}/>
                        <Text
                            style={styles.buttonStatusText}>{userData.hasGuessed ? 'Please wait till tomorrow.' : 'Submit your' + '\n' + 'prediction.'}</Text>
                    </View>
                </TouchableNativeFeedback>

                {/*Button 2*/}
                <TouchableNativeFeedback onPress={() => navigation.navigate('TodaysPredictions')}>
                    <View style={styles.rightButtonContainer}>
                        <View>
                            <Text style={styles.buttonTitleText}>Today's{'\n'}Predictions</Text>
                        </View>
                        <View style={styles.buttonStatusContainer}>
                            <Icon color='white' size={22} name={'people-outline'}/>
                            <Text style={styles.buttonStatusText}></Text>
                        </View>
                        <View style={styles.divider}/>
                        <Text style={styles.buttonStatusText}>See what others{'\n'}predicted .</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0c0c',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontFamily: 'ProximaNova-Bold',
        fontSize: 21,
    },
    subtitle: {
        paddingTop: 23,
        color: 'white',
        letterSpacing: 0.2,
        fontFamily: 'Georgia-Bold',
        fontSize: 21,
    },
    nameText: {
        color: '#b0b0b0'
    },
    maltaImage: {
        width: 288,
        height: 110,
        marginTop: 43
    },
    buttonRows: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftButtonContainer: {
        width: 160,
        height: 170,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#252525',
        borderRadius: 24
    },
    rightButtonContainer: {
        width: 160,
        height: 170,
        paddingLeft: 12,
        marginLeft: 15,
        paddingRight: 12,
        backgroundColor: '#252525',
        borderRadius: 24
    },
    buttonTitleText: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        paddingTop: 16,
        marginLeft: 6,
    },
    buttonStatusContainer: {
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        marginLeft: 6,
        marginTop: 4.3,
    },
    buttonStatusText: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        opacity: 0.75,
        marginLeft: 6,

    },
    divider: {
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.5,
        height: 1.5,
        marginBottom: 11,
        width: '100%',
        marginTop: 11
    }


})

