import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TouchableNativeFeedback, TouchableOpacity
} from "react-native";
import {Header} from 'react-native-elements'
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../../assets/colors/Colors";
import MyStyles from "../../../assets/styles/MyStyles";

export default function DashboardScreen({navigation}) {

    return (
        <View style={MyStyles.container}>
            <StatusBar style="light"/>
            <Header backgroundColor={Colors.darkBackground}
                    centerContainerStyle={MyStyles.mainHeaderCenterContainer}

                    centerComponent={<Text style={MyStyles.mainHeaderText}>DASHBOARD</Text>}
                    containerStyle={MyStyles.mainHeaderContainer}
            />

            <Text style={styles.subtitle}>Welcome back,
                <Text style={styles.nameText}> Justin.</Text>
            </Text>
            <Image style={styles.maltaImage} source={require('../../../assets/images/MALTA.png')}/>
            <ScrollView>
                <View style={styles.buttonRows}>
                    {/*Button 1*/}
                    <TouchableNativeFeedback onPress={() => navigation.navigate('SubmitPrediction')}>
                        <View style={styles.leftButtonContainer}>
                            <Text style={styles.buttonTitleText}>Your{'\n'}Prediction</Text>
                            <View style={styles.buttonStatusContainer}>
                                <Icon color='white' size={22} name={'md-checkmark-circle-sharp'}/>
                                <Text style={styles.buttonStatusText}>Submitted.</Text>
                            </View>
                            <View style={styles.divider}/>
                            <Text style={styles.buttonStatusText}>Submit your{'\n'}prediction.</Text>
                        </View>
                    </TouchableNativeFeedback>
                    {/*Button 2*/}
                    <TouchableNativeFeedback onPress={() => navigation.navigate('TodaysPrediction')}>
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
            </ScrollView>
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
        flexDirection: 'row'
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

