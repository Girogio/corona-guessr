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


import textBoxStyles from '../../../assets/styles/MyStyles'
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import {SocialIcon} from "react-native-elements";

export const addProfile = (name, email, password) => new Promise((resolve, reject) => {
    let d = new Date();
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            firebase.database().ref('/users/' + res.user.uid).set({
                date_created: d.toISOString(),
                email: email,
                displayName: name,
                rank: 'Wandering Guesser',
                score: {points: 0},
            })
        })
})
export default function RegisterScreen({navigation}) {
    const [fullNameFocus, setFullNameFocusState] = useState(false);
    const fullNameFocusStyle = fullNameFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;

    const [emailFocus, setEmailFocus] = useState(false);
    const emailFocusStyle = emailFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;

    const [passFocus, setPassFocus] = useState(false);
    const passFocusStyle = passFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;

    const [repeatPassFocus, setRepeatPassFocus] = useState(false);
    const repeatPassFocusStyle = repeatPassFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');


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
                    <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/>
                </View>
                <View style={{alignItems: "center", paddingTop: 10}}>

                    <TextInput
                        onFocus={() => setFullNameFocusState(true)}
                        onBlur={() => setFullNameFocusState(false)}
                        style={[styles.fullNameTextInput, fullNameFocusStyle]}
                        placeholder={'Full name'}
                        onChangeText={(name) => setName(name)}
                        placeholderTextColor={'gray'}
                    />
                    <TextInput
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        style={[styles.emailTextInput, emailFocusStyle]}
                        placeholder={'Email'}
                        onChangeText={(email) => setEmail(email)}
                        placeholderTextColor={'gray'}
                        keyboardType={'email-address'}
                    />
                    <TextInput
                        onFocus={() => setPassFocus(true)}
                        onBlur={() => setPassFocus(false)}
                        style={[styles.passwordTextInput, passFocusStyle]}
                        placeholder={'Password'}
                        onChangeText={(password) => setPassword(password)}
                        placeholderTextColor={'gray'}
                        secureTextEntry={true}
                    />
                    <TextInput
                        onFocus={() => setRepeatPassFocus(true)}
                        onBlur={() => setRepeatPassFocus(false)}
                        style={[styles.repeatPassTextInput, repeatPassFocusStyle]}
                        placeholder={'Repeat password'}
                        onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
                        placeholderTextColor={'gray'}
                        secureTextEntry={true}
                    />
                    <GradientButton
                        style={{marginVertical: 8, marginTop: 37, fontFamily: 'Poppins-SemiBold'}}
                        text="REGISTER"
                        textStyle={{fontSize: 15, lineHeight: 18}}
                        gradientBegin="#01B6FC"
                        gradientEnd='#26E3F6'
                        gradientDirection='vertical'
                        impact
                        height={51}
                        width={310}
                        radius={8}
                        onPressAction={() => addProfile(name, email, password)}
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
                    <View style={styles.socialLoginContainer}>
                        <SocialIcon
                            style={{borderRadius: 10, padding: 15, height: 50, width: 130}}
                            title='Google'
                            button
                            onPress={() => alert('Google')}
                            type='google'
                        />
                        <SocialIcon
                            style={{borderRadius: 10, padding: 15, height: 50, width: 130}}
                            title='Facebook'
                            button
                            fontStyle={{fontSize: 15}}
                            iconStyle={{}}
                            onPress={() => alert('Facebook!')}
                            type='facebook'
                        />
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
        fontFamily: 'Poppins-SemiBold'
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
        fontFamily: 'Poppins-Regular',
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
        fontFamily: 'Poppins-Regular',
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
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Regular',
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
        fontFamily: 'Poppins-Regular',
        color: '#fff',
        marginTop: 17,
        paddingRight: 10,
        paddingLeft: 17
    },
    forgotPasswordText: {
        color: '#01B3FE',
        paddingTop: 20,
        fontFamily: 'Poppins-SemiBold'
    },
    orContainer: {
        flexDirection: 'row'
    },
    orText: {
        width: 50,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    socialLoginContainer: {
        flexDirection: 'row',
        color: 'white',
        marginTop: 10,
        alignContent: 'center',
        justifyContent: 'space-between'
    },
});
