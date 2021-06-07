import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MyStyles from "../../../assets/styles/MyStyles";
import Colors from "../../../assets/colors/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {Header} from "react-native-elements";
import SwitchToggle from "react-native-switch-toggle";
import firebase from "firebase/app";
import "firebase/auth"


function logOut() {
    firebase.auth().signOut().then(console.log('Signed Out'));
}

export default function SettingsScreen({navigation}) {
    const [on, isON] = useState(false)


    return (
        <View style={MyStyles.container}>
            <Header backgroundColor={Colors.darkBackground}
                    leftComponent={
                        <TouchableOpacity onPress={() => navigation.pop(1)}>
                            <Icon name={'ios-chevron-back'} size={30} color={'white'} style={{paddingLeft: 35}}/>
                        </TouchableOpacity>
                    }
                    leftContainerStyle={MyStyles.mainHeaderLeftContainer}
                    centerContainerStyle={MyStyles.mainHeaderCenterContainer}
                    centerComponent={<Text style={MyStyles.mainHeaderText}>SETTINGS</Text>}
                    containerStyle={MyStyles.mainHeaderContainer}
            />
            <View style={styles.menuContainer}>
                {/*Profile stuff*/}
                <View style={{flexDirection: 'row', marginTop: 19, alignItems: 'center'}}>
                    <Image style={{borderRadius: 100, height: 38, width: 38}}
                           source={require('../../../assets/images/justin.jpg')}/>
                    <Text style={{fontFamily: 'ProximaNova-Bold', fontSize: 18, marginLeft: 16, color: 'white'}}>Justin
                        Byrne</Text>
                </View>

                {/*General section*/}
                <Text style={styles.entryTitle}>General</Text>
                <View style={styles.entrySubtitleContainer}>
                    <TouchableOpacity>
                        <Text style={styles.entrySubtitleText}>About us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcon color={'#ADADAD'} name={'chevron-right'} size={25}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.entrySubtitleContainer}>
                    <TouchableOpacity>
                        <Text style={styles.entrySubtitleText}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcon color={'#ADADAD'} name={'chevron-right'} size={25}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}/>

                {/*Account section*/}
                <Text style={[styles.entryTitle, {marginTop: 26}]}>Account</Text>
                <View style={styles.entrySubtitleContainer}>
                    <TouchableOpacity>
                        <Text style={styles.entrySubtitleText}>Change password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcon color={'#ADADAD'} name={'chevron-right'} size={25}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.entrySubtitleContainer}>
                    <TouchableOpacity>
                        <Text style={styles.entrySubtitleText}>Push notifications</Text>
                    </TouchableOpacity>
                    <SwitchToggle style={{alignSelf: "flex-end"}}
                                  containerStyle={{
                                      width: 53,
                                      height: 26,
                                      borderRadius: 20,
                                      backgroundColor: "#ccc",
                                      padding: 4
                                  }}
                                  circleStyle={{
                                      width: 19,
                                      height: 19,
                                      borderRadius: 19,
                                      backgroundColor: "white" // rgb(102,134,205)
                                  }}
                                  backgroundColorOn={Colors.primary}
                                  backgroundColorOff={'red'}
                                  onPress={() => isON(!on)}
                                  switchOn={on}
                                  circleColorOff="white"
                                  circleColorOn="white"
                                  duration={100}
                    />
                </View>

                <View style={styles.entrySubtitleContainer}>
                    <TouchableOpacity onPress={logOut}>
                        <Text style={[styles.entrySubtitleText, {color: '#FF4b3a'}]}>Sign out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logOut}>
                        <MaterialIcon color={'#FF4b3a'} name={'chevron-right'} size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    menuContainer: {
        backgroundColor: '#252525',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 35,
        borderRadius: 18,
        width: '90%',
        height: '83%'
    },
    entryTitle: {
        fontFamily: 'ProximaNova-Bold',
        color: 'white',
        fontSize: 20,
        marginTop: 20,
    },
    entrySubtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 18
    },
    entrySubtitleText: {
        fontFamily: 'ProximaNova-SemiBold',
        fontSize: 18,
        color: '#ADADAD'
    },
    divider: {
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.6,
        height: 1.5,
        width: '100%',
        marginTop: 20
    }

});
