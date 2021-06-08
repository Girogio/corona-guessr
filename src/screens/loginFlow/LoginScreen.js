import React, {useState} from "react";
import GradientButton from "react-native-gradient-buttons";
import Icon from "react-native-vector-icons/Ionicons";
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
import textBoxStyles from '../../../assets/styles/MyStyles'
import firebase from "firebase/app";
import "firebase/auth"
import UserInfo from "../../UserInfo";

function handleLogin(email, pass) {

    firebase.auth()
        .signInWithEmailAndPassword(
            email,
            pass
        )
        .then(() => {
firebase.auth().currentUser?.updateProfile({
    displayName: name
})
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        });
}

const LoginScreen = ({navigation}) => {
    const [emailFocus, setEmailFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const emailFocusStyle = emailFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;
    const passFocusStyle = passFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <StatusBar style="light"/>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.pop(1)}>
                            <Icon name={'ios-chevron-back'} size={30} color={'white'} style={{paddingLeft: 35}}/>
                        </TouchableOpacity>
                        <View style={styles.headerContainer}>
                            <View>
                                <Text style={styles.titleText}>Welcome back!</Text>
                                <Text style={styles.subTitle}>Hey there, sign in to continue!</Text>
                            </View>
                        </View>
                    </View>
                    <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/>
                </View>

                <View style={{alignItems: 'center', paddingTop: 115}}>
                    <TextInput
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        style={[styles.emailTextInput, emailFocusStyle]}
                        placeholder={'Email'}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor={'gray'}
                        keyboardType="email-address"
                    />
                    <TextInput
                        onFocus={() => setPassFocus(true)}
                        onBlur={() => setPassFocus(false)}
                        style={[styles.passwordTextInput, passFocusStyle]}
                        placeholder={'Password'}
                        onChangeText={(text) => setPass(text)}
                        placeholderTextColor={'gray'}
                        secureTextEntry={true}
                    />
                    <GradientButton
                        style={{marginVertical: 8, marginTop: 37, fontFamily: 'ProximaNova-Bold'}}
                        text="LOG IN"
                        textStyle={{fontSize: 15, lineHeight: 18}}
                        gradientBegin="#01B6FC"
                        gradientEnd='#26E3F6'
                        gradientDirection='vertical'
                        impact
                        height={51}
                        width={310}
                        radius={8}
                        onPressAction={() => handleLogin(email, pass)}
                    />
                    <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('ForgotPass')}>Forgot
                        your
                        password?
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 37,}}>
                        <View style={{flex: 1, height: 1, backgroundColor: 'white'}}/>
                        <View>
                            <Text style={styles.orText}>OR</Text>
                        </View>
                        <View style={{flex: 1, height: 1, backgroundColor: 'white'}}/>
                    </View>
                    <Text style={{color: 'white', fontFamily: 'ProximaNova-Bold', marginTop: 10}}>
                        Sign in with:
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
export default LoginScreen;

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
    emailTextInput: {
        borderColor: '#2F80ED',
        borderRadius: 8,
        backgroundColor: '#1f1f1f',
        height: 48,
        width: 310,
        borderWidth: 2,
        fontFamily: 'ProximaNova-Regular',
        color: '#fff',
        marginTop: 25,
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
