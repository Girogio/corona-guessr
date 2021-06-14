import React, {useState} from "react";

import {
    Button,
    Image,
    Keyboard,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import textBoxStyles from "../../../assets/styles/MyStyles";
import GradientButton from "react-native-gradient-buttons";
import {Header} from "react-native-elements";
import MyStyles from "../../../assets/styles/MyStyles";
import Colors from "../../../assets/colors/Colors";
import "firebase/auth"
import firebase from "firebase/app";
import {FancyAlert} from "react-native-expo-fancy-alerts";

const ResetPasswordScreen = ({navigation}) => {
    const [emailFocus, setEmailFocus] = useState(false);
    const emailFocusStyle = emailFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;
    const [email, setEmail] = useState('');
    const [visible, setVisible] = React.useState(false);
    const toggleAlert = React.useCallback(() => {
        setVisible(!visible);
    }, [visible]);

    function exitScreen() {
        toggleAlert()
        navigation.pop(1)
    }


    function resetPassDialog() {
        firebase.auth().sendPasswordResetEmail(email).then(r => toggleAlert())
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar style="light"/>
                <Header backgroundColor={Colors.darkBackground}
                        leftComponent={
                            <TouchableOpacity onPress={() => navigation.pop(1)}>
                                <Icon name={'ios-chevron-back'} size={30} color={'white'} style={{paddingLeft: 35}}/>
                            </TouchableOpacity>
                        }
                        leftContainerStyle={MyStyles.mainHeaderLeftContainer}
                        containerStyle={MyStyles.mainHeaderContainer}
                />
                <View style={{alignItems: 'center'}}>
                    <Image style={{width: 218, height: 143, marginTop: 19}}
                           source={require('../../../assets/images/lock.png')}/>
                    <Text style={styles.titleText}>Change your{'\n'}password.</Text>
                    <Text style={styles.subTitle}>Enter your email address to reset{'\n'}your password.</Text>
                    <TextInput
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        style={[styles.emailTextInput, emailFocusStyle]}
                        placeholder={'Email'}
                        placeholderTextColor={'gray'}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType={'email-address'}
                    />
                    <GradientButton
                        style={{marginVertical: 8, marginTop: 37, fontFamily: 'Poppins-SemiBold'}}
                        text="RESET PASSWORD"
                        textStyle={{fontSize: 15, fontFamily: 'Poppins-SemiBold'}}
                        gradientBegin="#01B6FC"
                        gradientEnd='#26E3F6'
                        gradientDirection='vertical'
                        impact
                        height={51}
                        width={310}
                        radius={8}
                        onPressAction={() => resetPassDialog()}
                    />
                    <FancyAlert
                        visible={visible}
                        onRequestClose={toggleAlert}
                        icon={<View style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: "#18c028",
                            borderRadius: 50,
                            width: '100%',
                        }}><Icon name={'checkmark-done'} size={25}/></View>}
                        style={{backgroundColor: 'white'}}
                    >
                        <Text style={{marginTop: -16, marginBottom: 32, color: 'black', textAlign: 'center'}}>Check your
                            inbox for instructions on how to reset your password!</Text>
                        <TouchableOpacity style={{
                            borderRadius: 32,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 8,
                            marginBottom: 10,
                            alignSelf: 'stretch',
                            backgroundColor: '#4CB748',
                            marginTop: 16,
                            minWidth: '50%',
                            paddingHorizontal: 16,
                        }} onPress={() => exitScreen()}>
                            <Text style={{color: 'white'}}>OK</Text>

                        </TouchableOpacity>
                    </FancyAlert>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#0C0C0C',
    },
    headerContainer: {
        flexDirection: 'row',
        paddingLeft: 35,
        paddingTop: 27
    },
    titleText: {
        fontSize: 30,
        marginTop: 46,
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 0.18,
        fontFamily: 'Poppins-SemiBold'
    },
    subTitle: {
        color: 'gray',
        textAlign: 'center',
        fontFamily: 'ProximaNova-Regular',
        fontSize: 15,
        marginTop: 9
    },
    logo: {
        marginBottom: -20,
        width: 100,
        height: 100,
    },
    emailTextInput: {
        borderColor: '#2F80ED',
        borderRadius: 8,
        backgroundColor: '#1f1f1f',
        height: 48,
        width: 310,
        borderWidth: 2,
        fontFamily: 'ProximaNova-Regular',
        color: '#fff',
        marginTop: 46,
        paddingRight: 17,
        paddingLeft: 17
    },

})

export default ResetPasswordScreen;
