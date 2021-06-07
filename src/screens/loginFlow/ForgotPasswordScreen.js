import React, {useState} from "react";
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";
import {
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

const ForgotPasswordScreen = ({navigation}) => {
    const [emailFocus, setEmailFocus] = useState(false);
    const emailFocusStyle = emailFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar style="light"/>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.pop(1)}>
                            <Icon name={'ios-chevron-back'} size={30} color={'white'} style={{paddingLeft: 35}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image style={{width: 218, height: 143, marginTop: 19}}
                           source={require('../../../assets/images/missingpass.png')}/>
                    <Text style={styles.titleText}>Forgot Password?</Text>
                    <Text style={styles.subTitle}>Enter your email address to retrieve {'\n'} your password.</Text>
                    <TextInput
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        style={[styles.emailTextInput, emailFocusStyle]}
                        placeholder={'Email'}
                        placeholderTextColor={'gray'}
                        keyboardType={'email-address'}
                    />
                    <GradientButton
                        style={{marginVertical: 8, marginTop: 37, fontFamily: 'ProximaNova-Bold'}}
                        text="RESET PASSWORD"
                        textStyle={{fontSize: 15, fontFamily: 'ProximaNova-Bold'}}
                        gradientBegin="#01B6FC"
                        gradientEnd='#26E3F6'
                        gradientDirection='vertical'
                        impact
                        height={51}
                        width={310}
                        radius={8}
                        onPressAction={() => alert('login')}
                    />
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
        letterSpacing: 0.18,
        fontFamily: 'ProximaNova-Bold'
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

export default ForgotPasswordScreen;
