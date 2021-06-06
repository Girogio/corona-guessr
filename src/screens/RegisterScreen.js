import React, {useState} from "react";
import GradientButton from "react-native-gradient-buttons";
import Icon from "react-native-vector-icons/Ionicons";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    View
} from "react-native";
import AppLoading from 'expo-app-loading';
import {useFonts} from "expo-font";
import textBoxStyles from '../../assets/styles/textBox'
import {responsiveWidth} from "react-native-responsive-dimensions";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function RegisterScreen({navigation}) {
    const [fullNameFocus, setFullNameFocusState] = useState(false);
    const fullNameFocusStyle = fullNameFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;

    const [emailFocus, setEmailFocus] = useState(false);
    const emailFocusStyle = emailFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;

    const [passFocus, setPassFocus] = useState(false);
    const passFocusStyle = passFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;

    const [repeatPassFocus, setRepeatPassFocus] = useState(false);
    const repeatPassFocusStyle = repeatPassFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;

    let [fontsLoaded] = useFonts({
        'ProximaNova-Bold': require('../../assets/fonts/ProximaNova-Bold.ttf'),
        'ProximaNova-Regular': require('../../assets/fonts/ProximaNova-Regular.ttf'),
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                backgroundColor: '#0C0C0C',

            }}>

                <StatusBar style="light"/>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View>
                        <Icon name={'ios-chevron-back'} size={30} color={'#0c0c0c'} style={{paddingLeft: 35}}/>
                        <View style={styles.headerContainer}>
                            <View>
                                <Text style={styles.titleText}>Welcome!</Text>
                                <Text style={styles.subTitle}>Hello there, sign up to continue!</Text>
                            </View>
                        </View>
                    </View>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
                </View>
                <View style={{alignItems: "center", paddingTop: 10}}>

                    <TextInput
                        onFocus={() => setFullNameFocusState(true)}
                        onBlur={() => setFullNameFocusState(false)}
                        style={[styles.fullNameTextInput, fullNameFocusStyle]}
                        placeholder={'Full name'}
                        placeholderTextColor={'gray'}
                    />
                    <TextInput
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        style={[styles.emailTextInput, emailFocusStyle]}
                        placeholder={'Email'}
                        placeholderTextColor={'gray'}
                        keyboardType={'email-address'}
                    />
                    <TextInput
                        onFocus={() => setPassFocus(true)}
                        onBlur={() => setPassFocus(false)}
                        style={[styles.passwordTextInput, passFocusStyle]}
                        placeholder={'Password'}
                        placeholderTextColor={'gray'}
                        secureTextEntry={true}
                    />
                    <TextInput
                        onFocus={() => setRepeatPassFocus(true)}
                        onBlur={() => setRepeatPassFocus(false)}
                        style={[styles.repeatPassTextInput, repeatPassFocusStyle]}
                        placeholder={'Repeat password'}
                        placeholderTextColor={'gray'}
                        secureTextEntry={true}
                    />
                    <GradientButton
                        style={{marginVertical: 8, marginTop: 37, fontFamily: 'ProximaNova-Bold'}}
                        text="REGISTER"
                        textStyle={{fontSize: 15, lineHeight: 18}}
                        gradientBegin="#01B6FC"
                        gradientEnd='#26E3F6'
                        gradientDirection='vertical'
                        impact
                        height={51}
                        width={310}
                        radius={8}
                        onPressAction={() => navigation.navigate('Register')}
                    />
                    <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('Login')}>Already have an
                        account?</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 20,}}>
                        <View style={{flex: 1, height: 1, backgroundColor: 'white'}}/>
                        <View>
                            <Text style={styles.orText}>OR</Text>
                        </View>
                        <View style={{flex: 1, height: 1, backgroundColor: 'white'}}/>
                    </View>
                    <Text style={{color: 'white', fontFamily: 'ProximaNova-Bold', marginTop: 10}}>
                        Register with:
                    </Text>
                    <View style={styles.socialLoginContainer}>
                        <TouchableOpacity onPress={() => alert('Google!')}>
                            <View style={styles.googleButton} onPress={() => alert('Google!')}>
                                <Icon name="logo-google" size={17} color="white"/>
                                <Text style={{
                                    paddingLeft: 10,
                                    fontSize: 14,
                                    color: 'white',
                                    fontFamily: 'ProximaNova-Regular'
                                }}>Google</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert('Facebook!')}>
                            <View style={styles.facebookButton}>
                                <Icon name="logo-facebook" size={17} style={{paddingLeft: 20}} color="white"/>
                                <Text style={{
                                    paddingLeft: 7,
                                    paddingRight: 16,
                                    fontSize: 14,
                                    fontFamily: 'ProximaNova-Regular',
                                    color: 'white'
                                }}>Facebook</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#0C0C0C',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        paddingLeft: 35,
        paddingTop: 27
    },
    titleText: {
        fontSize: 30,
        color: '#fff',
        fontFamily: 'ProximaNova-Bold'
    },
    subTitle: {
        color: 'gray',
        paddingLeft: 10
    },
    logo: {
        marginBottom: -20,
        width: 100,
        height: 100,
    },
    fullNameTextInput: {
        borderColor: '#2F80ED',
        borderRadius: 8,
        backgroundColor: '#1f1f1f',
        height: 48,
        width: 310,
        borderWidth: 2,
        fontFamily: 'ProximaNova-Regular',
        color: '#fff',
        marginTop: 17,
        paddingRight: 10,
        paddingLeft: 17
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
        marginTop: 17,
        paddingRight: 10,
        paddingLeft: 17
    },
    passwordTextInput: {
        borderColor: '#2F80ED',
        borderRadius: 8,
        backgroundColor: '#1f1f1f',
        height: 48,
        width: 310,
        borderWidth: 2,
        fontFamily: 'ProximaNova-Regular',
        color: '#fff',
        marginTop: 17,
        paddingRight: 10,
        paddingLeft: 17
    },
    repeatPassTextInput: {
        borderColor: '#2F80ED',
        borderRadius: 8,
        backgroundColor: '#1f1f1f',
        height: 48,
        width: 310,
        borderWidth: 2,
        fontFamily: 'ProximaNova-Regular',
        color: '#fff',
        marginTop: 17,
        paddingRight: 10,
        paddingLeft: 17
    },
    forgotPasswordText: {
        color: '#01B3FE',
        paddingTop: 20,
        fontFamily: 'ProximaNova-Bold'
    },
    orContainer: {
        flexDirection: 'row'
    },
    orText: {
        width: 50,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: 'ProximaNova-Bold',
    },
    socialLoginContainer: {
        flexDirection: 'row',
        marginTop: 20,
        color: 'white',
        justifyContent: 'space-between'
    },
    googleButton: {
        width: 113,
        height: 42,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#de5246'
    },
    facebookButton: {
        width: 113,
        height: 42,
        marginLeft: 21,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5998'
    }
});
