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
                    <TouchableNativeFeedback>
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
        backgroundColor: '#252525',
        borderRadius: 24
    },
    rightButtonContainer: {
        width: 160,
        height: 170,
        marginLeft: 15,
        backgroundColor: '#252525',
        borderRadius: 24
    },
    buttonTitleText: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        paddingTop: 16,
        paddingLeft: 16,
    },
    buttonStatusContainer: {
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: 4.3,
        paddingLeft: 16,
    },
    buttonStatusText: {
        marginLeft: 10,
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        opacity: 0.75
    },
    divider: {
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.5,
        height: 1.5,
        width: 137,
        marginTop: 11
    }

})

