import React, {Component, useEffect, useRef, useState} from "react";
import {FlatList, Image, StatusBar, Text, TouchableOpacity, View} from "react-native";
import MyStyles from "../../../assets/styles/MyStyles";
import {Header} from "react-native-elements";
import Colors from "../../../assets/colors/Colors";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import firebase from 'firebase/app'
import Toast, {BaseToast} from 'react-native-toast-message';
import 'firebase/database'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import Icon from "react-native-vector-icons/Ionicons";

const renderLeaderboardItem = ({item}) => {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 25}}>
            {/*Ranking*/}
            <View style={{alignItems: 'center', paddingRight: 13, justifyContent: 'center',}}>
                <Text style={{color: 'white'}}> {item.position} </Text>
                {/*<MaterialIcon
                    name={item.hasIncreased ? 'arrow-drop-up' : 'arrow-drop-down'}
                    color={item.hasIncreased ? 'green' : 'red'}
                    size={40}
                />*/}
            </View>
            {/*Main content*/}
            <View style={{
                backgroundColor: item.uid === firebase.auth().currentUser.uid ? '#18647C' : Colors.lighterBackground,
                alignItems: 'center',
                width: wp('85%'),
                flexDirection: 'row',
                padding: 10,
                alignSelf: 'center',
                justifyContent: 'space-between',
                borderRadius: 30
            }}>
                {/*Picture & name*/}
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={{
                            width: 58,
                            height: 58,
                            borderRadius: 29
                        }}
                        source={require('../../../assets/images/justin.jpg')}/>
                    <Text style={{color: 'white', marginLeft: 8, fontFamily: 'Poppins-SemiBold'}}> {item.name}</Text>
                </View>

                {/*Point indicator*/}
                <View style={{
                    backgroundColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 3,
                    borderRadius: 50,
                }}>
                    <Text style={{color: '#19D4F8', fontSize: 10}}>{
                        item.points} points
                    </Text>
                </View>
            </View>
        </View>
    )
}


export default function LeaderboardScreen() {

    const [caseStatistics, setCaseStatistics] = useState([])
    const [userData, setUserData] = useState([])
    const toast = useRef(null);

    function onRefresh() {
        /*Update User Data*/
        firebase.database().ref('users/').once('value', snapshot => {
            const toUserData = []
            let toUserDataDotGuesses = []
            snapshot.forEach(user => {
                user.child('/guesses/').forEach(guess => {
                    toUserDataDotGuesses.push({
                        date: guess.key,
                        guess: guess.val().guess
                    })
                })
                toUserData.push({
                    uid: user.key,
                    name: user.val().displayName,
                    points: user.child('/score/points').val(),
                    guesses: toUserDataDotGuesses,
                    position: user.child('/score/position').val(),
                })

                toUserDataDotGuesses = []
            })
            setUserData(toUserData)


        })

        /*Update Statistics*/
        firebase.database().ref('statistics/').on('value', snapshot => {
            const toStatistics = []
            snapshot.forEach(day => {
                toStatistics.push({
                    date: day.key,
                    new_cases: day.val().new_cases
                })
            })
            setCaseStatistics(toStatistics)
        })

        /*Set all user points*/
        userData.forEach(user => {
                user.points = 0
                user.guesses.forEach(guess => {
                    caseStatistics.forEach((entry) => {
                        if (guess.date === entry.date)
                            if (guess.guess == entry.new_cases)
                                ++user.points;
                    })


                })
                firebase.database().ref('users/' + user.uid + '/score/points').set(user.points).then(() => {

                })

            }
        )


        setUserData(userData.sort((a, b) => {
            return b.points - a.points;
        }))

        userData.forEach(user => {
            /// if (user.score)
            firebase.database().ref('users/' + user.uid + '/score/position').set((userData.indexOf((user)) + 1))
        })
    }


    useEffect(() => {
        onRefresh()
    }, [])

    return (
        <View style={[MyStyles.container, {
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
        }]}>
            <StatusBar style="light"/>
            <Header backgroundColor={Colors.darkBackground}
                    rightComponent={
                        <TouchableOpacity onPress={() => {
                            onRefresh()
                            toast.current.show({
                                type: 'success',
                                text1: 'Refresh successful!',
                                text2: 'Leaderboard is now up to date!',
                                position: 'bottom',
                                visibilityTime: 3000,
                                bottomOffset: 10,
                                props: {
                                    guid: 'guid-id', onPress: () => {
                                    }
                                }
                            });
                        }}>
                            <Icon name={'reload'} style={{marginRight: wp('6%')}}
                                  size={30} color={'white'}/>
                        </TouchableOpacity>
                    }
                    centerComponent={
                        <Text style={MyStyles.mainHeaderText}>LEADERBOARD</Text>
                    }

                    containerStyle={[MyStyles.mainHeaderContainer, {paddingBottom: 40}]}
            />
            <FlatList
                data={userData.sort((a, b) => {
                    return a.position - b.position;
                })}
                renderItem={renderLeaderboardItem}
                keyExtractor={item => item.uid}
            />
            <Toast ref={toast}/>
        </View>
    )
}


class Main extends Component {

    render() {
        return (
            <View style={MyStyles.container}>
                {/*<View style={{
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    marginTop: 19,
                    paddingBottom: 20
                }}>
                    Robert
                    <View style={{alignItems: 'center'}}>
                        <MaterialIcon
                            name={'arrow-drop-up'}
                            color={'green'}
                            size={40}
                            style={{marginBottom: -15}}/>
                        <Text
                            style={{
                                fontFamily: 'Poppins-SemiBold',
                                color: 'white',
                                fontSize: 15
                            }}>
                            2
                        </Text>
                        <Image
                            style={{
                                width: 90,
                                height: 90,
                                borderRadius: 65
                            }}
                            source={require('../../../assets/images/robert.jpg')}/>

                        <Text
                            style={{color: 'white', paddingTop: 8, fontFamily: 'Poppins-SemiBold', fontSize: 13}}>Robert
                            Barnett</Text>
                        <View style={{
                            backgroundColor: '#252525',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 7,
                            paddingLeft: 12,
                            paddingRight: 12,
                            paddingTop: 3,
                            paddingBottom: 3,
                            borderRadius: 50
                        }}>
                            <Text style={{color: '#19D4F8', fontSize: 10}}>2 points</Text>
                        </View>
                    </View>
                    Justin
                    <View style={{alignItems: 'center'}}>
                        <MaterialIcon
                            name={'arrow-drop-up'}
                            color={'green'}
                            size={40}
                            style={{marginBottom: -15}}/>
                        <Text
                            style={{
                                fontFamily: 'Poppins-SemiBold',
                                color: 'white',
                                fontSize: 15
                            }}>
                            1
                        </Text>
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 65
                            }}
                            source={require('../../../assets/images/justin.jpg')}/>
                        <Text style={{
                            marginLeft: 18,
                            paddingTop: 8,
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 13,
                            color: 'white',
                            marginRight: 18
                        }}>Justin Byrne</Text>

                        <View style={{
                            backgroundColor: '#252525',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 7,
                            paddingLeft: 12,
                            paddingRight: 12,
                            paddingTop: 3,
                            paddingBottom: 3,
                            borderRadius: 50
                        }}>
                            <Text style={{color: '#19D4F8', fontSize: 10}}>2 points</Text>
                        </View>
                    </View>
                    Roman
                    <View style={{alignItems: 'center'}}>
                        <MaterialIcon
                            name={'arrow-drop-down'}
                            color={'red'}
                            size={40}
                            style={{marginBottom: -15}}/>
                        <Text
                            style={{
                                fontFamily: 'Poppins-SemiBold',
                                color: 'white',
                                fontSize: 15
                            }}>
                            3
                        </Text>
                        <Image
                            style={{
                                width: 82,
                                height: 82,
                                borderRadius: 65
                            }}
                            source={require('../../../assets/images/roman.jpg')}/>

                        <Text style={{color: 'white', paddingTop: 8, fontFamily: 'Poppins-SemiBold', fontSize: 13}}>Roman
                            Farrugia</Text>
                        <View style={{
                            backgroundColor: '#252525',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 7,
                            paddingLeft: 12,
                            paddingRight: 12,
                            paddingTop: 3,
                            paddingBottom: 3,
                            borderRadius: 50
                        }}>
                            <Text style={{color: '#19D4F8', fontSize: 10}}>2 points</Text>
                        </View>
                    </View>


                </View>*/}


            </View>
        )
    }
}


