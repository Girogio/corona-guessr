import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image, Linking,
    Platform, SafeAreaView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import {Header} from "react-native-elements";
import Colors from "../../../assets/colors/Colors";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import Icon from "react-native-vector-icons/Ionicons";
import MyStyles from "../../../assets/styles/MyStyles";
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import Achievements from "../../../assets/data/Achievements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from 'expo-document-picker';

export default function ProfileScreen({navigation}) {
    const BadgedIcon = (MaterialCommunityIcons)
    const user = firebase.auth().currentUser;

    const [image, setImage] = useState(null);
    const [userAchievements, setUserAchievements] = useState([])
    const [userData, setUserData] = useState({
        date_created: '',
        displayName: '',
        email: '',
        rank: '',
    });

    async function chooseFile() {
        await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            copyToCacheDirectory: false,
            multiple: false
        }).then(response => {
            setImage(response.uri)
            firebase.storage().ref('profile-images/' + user.uid).put(response.uri)

        })
    }

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
            })
        firebase.database()
            .ref('users/' + user.uid + '/achievements')
            .on('value', snapshot => {
                const toAchievements = []
                snapshot.forEach(item => {
                    toAchievements.push(item.key)
                })
                setUserAchievements(toAchievements)
            });

    }, [setUserAchievements, setUserData])


    function renderAchievementItem({item}) {
        return (
            <TouchableNativeFeedback>
                <View style={[styles.leftButtonContainer]}>
                    <Text style={styles.buttonTitleText}>{item.title}</Text>
                    <View style={styles.buttonStatusContainer}>
                        <Icon color='white' size={22} name={item.icon}/>
                        <Text style={styles.buttonStatusText}> </Text>
                    </View>
                    <View style={styles.divider}/>
                    <Text style={styles.buttonStatusText}>{item.description}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }

    //console.log(userData)
    return (
        <SafeAreaView style={MyStyles.container}>
            <Header backgroundColor={Colors.darkBackground}
                    rightComponent={
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Icon name={'settings-outline'} style={{marginRight: wp('6%')}}
                                  size={30} color={'white'}/>
                        </TouchableOpacity>
                    }
                    centerComponent={
                        <Text style={MyStyles.mainHeaderText}>PROFILE</Text>
                    }

                    containerStyle={MyStyles.mainHeaderContainer}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View>
                    {/* {image && <Image source={{uri: image}} style={{*/}
                    {<Image source={require('../../../assets/images/giorgio.jpg')} style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        borderWidth: 2,
                        borderColor: 'white'
                    }}/>}
                    <BadgedIcon type="MaterialCommunityIcons"
                                name={"pencil-circle"}
                                onPress={() => chooseFile()}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 40,
                                    position: 'absolute',
                                    bottom: 5,
                                    right: -4,
                                    color: Colors.lighterPrimary
                                }} size={30}
                    />
                </View>
                <View
                    style={{alignItems: 'flex-start', justifyContent: 'center', paddingBottom: 20, marginLeft: 30}}>
                    <Text style={{color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 16}}>
                        {userData.displayName}
                    </Text>
                    <Text style={{color: 'gray', fontFamily: 'Poppins-Regular', fontSize: 16}}>
                        {userData.rank}
                    </Text>
                </View>
            </View>
            <View style={{alignSelf: 'flex-start', paddingLeft: 30, paddingTop: 30}}>
                <Text style={{fontFamily: 'Poppins-SemiBold', color: 'white', fontSize: 24}}>Achievements</Text>
            </View>
            <View style={{alignSelf: 'center'}}>
                <FlatList
                    data={Achievements}
                    renderItem={renderAchievementItem}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    leftButtonContainer: {
        width: 160,
        height: 170,
        margin: 10,
        paddingHorizontal: 12,
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
    }, buttonStatusText: {
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

