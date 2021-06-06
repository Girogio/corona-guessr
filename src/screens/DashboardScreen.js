import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TouchableNativeFeedback
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function DashboardScreen() {

    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Text style={styles.title}>DASHBOARD</Text>
            <Text style={styles.subtitle}>Welcome back,
                <Text style={styles.nameText}> Justin.</Text>
            </Text>
            <Image style={styles.maltaImage} source={require('../../assets/images/MALTA.png')}/>
            <ScrollView>
                <View style={styles.buttonRows}>
                    <TouchableNativeFeedback>
                        <View style={{width: 160, height: 170, backgroundColor: '#252525', borderRadius: 24}}>
                            <View>
                                <Text style={{
                                    fontFamily: 'Poppins-SemiBold',
                                    color: 'white',
                                    paddingTop: 16,
                                    paddingLeft: 16,
                                }}>Your{'\n'}Prediction</Text>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                alignContent: 'center',
                                flexDirection: 'row',
                                marginTop: 4.3,
                                paddingLeft: 16
                            }}>
                                <Icon color='white' size={22} name={'md-checkmark-circle-sharp'}/>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 12,
                                    fontFamily: 'Poppins-SemiBold',
                                    color: 'white',
                                    opacity: 0.75
                                }}>Submitted.</Text>
                            </View>
                            <View style={{
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                opacity: 0.5,
                                height: 1.5,
                                width: 137,
                                marginTop: 11
                            }}/>
                            <Text style={{
                                marginLeft: 16,
                                fontSize: 12,
                                paddingTop: 10,
                                marginBottom: 23,
                                fontFamily: 'Poppins-SemiBold',
                                color: 'white',
                                opacity: 0.75
                            }}>
                                Submit your{'\n'}prediction.
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={{
                            width: 160,
                            height: 170,
                            marginLeft: 15,
                            backgroundColor: '#252525',
                            borderRadius: 24
                        }}>
                            <View>
                                <Text style={{
                                    fontFamily: 'Poppins-SemiBold',
                                    color: 'white',
                                    paddingTop: 16,
                                    paddingLeft: 16,
                                }}>Your{'\n'}Prediction</Text>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                alignContent: 'center',
                                flexDirection: 'row',
                                marginTop: 4.3,
                                paddingLeft: 16
                            }}>
                                <Icon color='white' size={22} name={'md-checkmark-circle-sharp'}/>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 12,
                                    fontFamily: 'Poppins-SemiBold',
                                    color: 'white',
                                    opacity: 0.75
                                }}>Submitted.</Text>
                            </View>
                            <View style={{
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                opacity: 0.5,
                                height: 1.5,
                                width: 137,
                                marginTop: 11
                            }}/>
                            <Text style={{
                                marginLeft: 16,
                                fontSize: 12,
                                paddingTop: 10,
                                marginBottom: 23,
                                fontFamily: 'Poppins-SemiBold',
                                color: 'white',
                                opacity: 0.75
                            }}>
                                Submit your{'\n'}prediction.
                            </Text>
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
        flex: 1,

        alignItems: 'center'
    },
    title: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 21 : 21,
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

})

