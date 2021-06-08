import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Text,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TouchableNativeFeedback, TouchableOpacity, FlatList
} from "react-native";
import {Header} from 'react-native-elements'
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../../assets/colors/Colors";
import firebase from "firebase/app";
import 'firebase/auth'
import MyStyles from "../../../assets/styles/MyStyles";
import DashboardButtons from "../../../assets/data/DashboardButtons";

export default function DashboardScreen({navigation}) {

    function renderDashboardButton({item}) {
        return (
            <TouchableNativeFeedback onPress={() => navigation.navigate(item.screen)}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitleText}>{item.title}</Text>
                    <View style={styles.buttonStatusContainer}>
                        <Icon color='white' size={22} name={item.icon}/>
                        <Text style={styles.buttonStatusText}>{item.statusText}</Text>
                    </View>
                    <View style={styles.divider}/>
                    <Text style={styles.buttonStatusText}>{item.subtitleText}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }

    const [userData, setUserData] = useState({
        date_created: '',
        displayName: '',
        email: '',
        rank: '',
    });

    useEffect(() => {
        firebase.database()
            .ref('users/' + firebase.auth().currentUser.uid)
            .on('value', snapshot => {
                const userStuff = {
                    date_created: snapshot.val().date_created,
                    displayName: snapshot.val().displayName,
                    email: snapshot.val().email,
                    rank: snapshot.val().rank,
                    achievements: snapshot.val().achievements
                }
                setUserData(userStuff)
            });
    }, [])

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
            <View style={{marginTop: 50}}>
                <FlatList data={DashboardButtons}
                          renderItem={renderDashboardButton}
                          keyExtractor={(item) => (item.id)}
                          numColumns={2}

                />
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
    buttonContainer: {
        width: 160,
        height: 170,
        paddingLeft: 12,
        margin: 7.5,
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

