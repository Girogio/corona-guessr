import React, {useEffect} from "react";
import {Image, Platform, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {Header} from "react-native-elements";
import Colors from "../../../assets/colors/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import MyStyles from "../../../assets/styles/MyStyles";
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'


export default function ProfileScreen({navigation}) {
    const [userName, setUsername] = React.useState('')

    useEffect(() => {
            firebase.database()
                .ref('users/' + firebase.auth().currentUser.uid + '/displayName')
                .once('value')
                .then(snapshot => {
                    setUsername(snapshot.val())
                })
        }, [userName]
    )


    return (
        <View style={MyStyles.container}>
            <Header backgroundColor={Colors.darkBackground}
                    rightComponent={
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Icon name={'settings-outline'} size={30} color={'white'}/>
                        </TouchableOpacity>
                    }
                    centerComponent={
                        <Text style={MyStyles.mainHeaderText}>PROFILE</Text>
                    }

                    containerStyle={MyStyles.mainHeaderContainer}
                    rightContainerStyle={{marginRight: 20}}
                    centerContainerStyle={MyStyles.mainHeaderCenterContainer}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{width: 120, height: 120, borderRadius: 60}}
                       source={require('../../../assets/images/justin.jpg')}/>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', paddingBottom: 20, marginLeft: 30}}>
                    <Text style={{color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 16}}>
                        {userName}
                    </Text>
                    <Text style={{color: 'gray', fontFamily: 'Poppins-Regular', fontSize: 16}}>
                        Apprentice Predictor
                    </Text>
                </View>
            </View>
        </View>
    )
}
