import React, {useEffect, useState} from "react";
import {FlatList, Image, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {Badge, Header, withBadge} from "react-native-elements";
import Colors from "../../../assets/colors/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import MyStyles from "../../../assets/styles/MyStyles";
import {dailyData} from "../../../assets/data/dailyData";
import firebase from "firebase";


function renderItem({item}) {
    const BadgedIcon = (Icon)
    return (
        <View style={{
            backgroundColor: '#252525',
            alignSelf: 'center',
            flexDirection: 'row',
            paddingVertical: 10,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '85%',
            borderRadius: 30
        }}>
            {/*Profile stuff*/}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                    <Image style={{width: 58, height: 58, borderRadius: 29, marginLeft: 15}} source={item.image}/>
                    {item.hasPredicted
                        ? <BadgedIcon type="ionicon"
                                      name={"checkmark-circle"}
                                      style={{color: 'white', position: 'absolute', bottom: 0, right: -9}}
                                      size={20}/> : null}
                </View>

                <Text style={{
                    color: 'white',
                    paddingLeft: 11,
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 13
                }}>{item.displayName}</Text>
            </View>

            {/*Guess number*/}
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                borderRadius: 50,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 6,
                paddingBottom: 6,
                marginRight: 24
            }}>
                <Text style={{
                    color: item.hasPredicted ? Colors.lighterPrimary : 'red',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 10,
                }}>
                    {item.hasPredicted ? 'Predicted: ' + item.guess : 'N/A'}
                </Text>
            </View>
        </View>
    )
}

export default function TodaysPredictionScreen({navigation}) {

    const [allUsers, setAllusers] = useState([])
    const [allPredictions, setAllPredictions] = useState([])
    const now = new Date();


    useEffect(() => {


        firebase.database()
            .ref('guesses/' + now.getDate() + '_' + (now.getMonth() + 1) + '_' + now.getFullYear())
            .on('value', snapshot => {
                const toPredictions = []
                snapshot.forEach(guess => {
                    toPredictions.push({
                        guess: guess.val().guess,
                        hasGuessed: 2,
                        uid: guess.key,
                    })
                })
                setAllPredictions(toPredictions)

            });

        firebase.database()
            .ref('users/')
            .on('value', snapshot => {
                const toAllUsers = []
                snapshot.forEach(user => {
                    toAllUsers.push({
                        uid: user.key,
                        displayName: user.val().displayName,
                        hasGuessed: user.val().hasGuessed,
                    })
                })
                setAllusers(toAllUsers)

            })
    }, [])

    function getHasGuessedByUid({uid}) {
        console.log(allUsers.filter(user => user.uid === '3M3FgI9WNXOvh4lDH9otvsbZWem2'))
    }

    return (
        <View style={MyStyles.container}>
            <StatusBar style="light"/>
            <Header backgroundColor={Colors.darkBackground}
                    leftComponent={
                        <TouchableOpacity onPress={() => navigation.pop(1)}>
                            <Icon name={'ios-chevron-back'} size={30} color={'white'} style={{paddingLeft: 35}}/>
                        </TouchableOpacity>
                    }
                    leftContainerStyle={MyStyles.mainHeaderLeftContainer}
                    centerComponent={
                        <Text style={MyStyles.mainHeaderText}>TODAY'S PREDICTIONS</Text>
                    }
                    containerStyle={[MyStyles.mainHeaderContainer, {paddingBottom: 30}]}
                    centerContainerStyle={MyStyles.mainHeaderCenterContainer}
            />
            <FlatList
                data={dailyData.sort((a, b) => b.hasPredicted - a.hasPredicted)}
                renderItem={renderItem}
                keyExtractor={item => item.id}/>
        </View>
    )
}
