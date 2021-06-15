import React from "react";
import {Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyStyles from "../../../assets/styles/MyStyles";
import Colors from "../../../assets/colors/Colors";
import MaterialCommIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";

export default function OnBoardingScreen({navigation}) {
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('@first_timer', 'false');
        } catch (error) {
            console.log(error)
        }
        navigation.navigate('MainStack')
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar style="light"/>
            <Onboarding
                onDone={() => {
                    storeData().then()
                }}
                pages={
                    [
                        {
                            backgroundColor: Colors.darkBackground,
                            image:
                                <TouchableNativeFeedback>
                                    <View style={[styles.leftButtonContainer]}>
                                        <Text style={styles.buttonTitleText}>Your{'\n'}Prediction</Text>
                                        <View style={styles.buttonStatusContainer}>
                                            <MaterialCommIcon color='white' size={22}
                                                              name={'clock-time-four'}/>
                                            <Text
                                                style={styles.buttonStatusText}>Take a guess!</Text>
                                        </View>
                                        <View style={styles.divider}/>
                                        <Text
                                            style={styles.buttonStatusText}>{'Submit your' + '\n' + 'prediction.'}</Text>
                                    </View>
                                </TouchableNativeFeedback>,
                            title: 'Guess!',
                            subTitleStyles: {fontFamily: 'Poppins-Regular', fontSize: 20},
                            titleStyles: {fontFamily: 'Poppins-SemiBold', fontSize: 30},
                            subtitle: 'Enter your prediction\ndaily!',
                        },
                        {
                            backgroundColor: Colors.darkBackground,
                            image:
                                <TouchableNativeFeedback>
                                    <View style={styles.rightButtonContainer}>
                                        <View>
                                            <Text style={styles.buttonTitleText}>Today's{'\n'}Predictions</Text>
                                        </View>
                                        <View style={styles.buttonStatusContainer}>
                                            <Icon color='white' size={22} name={'people-outline'}/>
                                           {/*<Text style={styles.buttonStatusText}></Text>*/}
                                        </View>
                                        <View style={styles.divider}/>
                                        <Text style={styles.buttonStatusText}>See what others{'\n'}predicted .</Text>
                                    </View>
                                </TouchableNativeFeedback>,
                            title: 'Compete!',
                            subTitleStyles: {fontFamily: 'Poppins-Regular', fontSize: 20},
                            titleStyles: {fontFamily: 'Poppins-SemiBold', fontSize: 30},
                            subtitle: 'See what others\npredicted!',
                        },
                    ]
                }
            />
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0c0c',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
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
