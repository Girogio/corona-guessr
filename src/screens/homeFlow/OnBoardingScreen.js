import React from "react";
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../../assets/colors/Colors";
import MaterialCommIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import * as Animatable from 'react-native-animatable';

export default function OnBoardingScreen({navigation}) {


    async function chooseFile() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            const blob: Blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function () {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", result.uri, true);
                xhr.send(null);
            });
            const ref = firebase.storage().ref().child(`avatars/${firebase.auth().currentUser.uid}`);
            const snapshot = await ref.put(blob, {contentType: "image/png"});
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/image').set(await snapshot.ref.getDownloadURL()).then()
        }

    }

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
                //showSkip={false}
                skipToPage={3}
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
                        {
                            backgroundColor: Colors.darkBackground,
                            image:
                                <Animatable.View animation={"pulse"} iterationCount={'infinite'} direction={'alternate'}  style={{backgroundColor: '#252525', borderRadius: 24, padding: 20}}>
                                    <MaterialCommIcon onPress={chooseFile} name={'pencil'} size={125} color={'white'}/>
                                </Animatable.View>,
                            title: 'Almost done!',
                            subTitleStyles: {fontFamily: 'Poppins-Regular', fontSize: 20},
                            titleStyles: {fontFamily: 'Poppins-SemiBold', fontSize: 30},
                            subtitle: 'Maybe pick a profile\npicture?',
                        },
                        {
                            backgroundColor: Colors.darkBackground,
                            image:
                                <View style={{backgroundColor: '#252525', borderRadius: 24, padding: 20}}>
                                    <MaterialCommIcon name={'check-all'} size={125} color={'white'}/>
                                </View>,
                            title: 'Enjoy!',
                            subTitleStyles: {fontFamily: 'Poppins-Regular', fontSize: 20},
                            titleStyles: {fontFamily: 'Poppins-SemiBold', fontSize: 30},
                            subtitle: 'This tutorial will not\nbe shown again.',
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
