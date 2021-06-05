import React, {useState} from "react";
import GradientButton from "react-native-gradient-buttons";
import Icon from "react-native-vector-icons/Ionicons";
import {Image, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import AppLoading from 'expo-app-loading';
import {useFonts} from "expo-font";
import textBoxStyles from '../../assets/styles/textBox'

export default function RegisterScreen() {

    const [nameFocus, setNameFocus] = useState(false);
    const nameFocusStyle = nameFocus ? textBoxStyles.textInputFocus : textBoxStyles.textInputBlurred;


    let [fontsLoaded] = useFonts({
        'ProximaNova-Bold': require('../../assets/fonts/ProximaNova-Bold.ttf'),
        'ProximaNova-Regular': require('../../assets/fonts/ProximaNova-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={styles.container}>
                <StatusBar style="light"/>
                <View style={styles.headerContainer}>
                    <View syle={styles.headerTitleContainer}>
                        <Text style={styles.titleText}>Welcome.</Text>
                        <Text style={styles.subTitle}>Hello there, sign in to continue!</Text>
                    </View>
                    <Image source={require('../../assets/images/logo.png')} size={90}/>
                </View>
                <TextInput
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    style={[styles.fullNameTextInput, nameFocusStyle]}
                    placeholder={'Full name'}
                    placeholderTextColor={'gray'}
                    autoCompleteType={'email'}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#0C0C0C',
        alignItems: 'center',
    },
    headerContainer: {
        paddingTop: 20,
        marginLeft: 25,
        flexDirection: 'row'
    },
    headerTitleContainer: {},
    titleText: {
        fontSize: 36,
        marginLeft: -10,
        color: '#fff',
        fontFamily: 'ProximaNova-Bold'
    },
    subTitle: {
        marginTop: 15,
        paddingLeft: 20,
        color: 'gray',
    },
    logo: {
        width: 99,
        marginLeft: 0,
        height: 75,
        marginBottom: 1
    },
    fullNameTextInput: {
        borderRadius: 8,
        backgroundColor: '#1f1f1f',
        height: 48,
        width: 310,
        borderWidth: 2,
        fontFamily: 'ProximaNova-Bold',
        color: '#fff',
        marginTop: 43,
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
        fontFamily: 'ProximaNova-Bold',
        color: '#fff',
        marginTop: 17,
        paddingRight: 10,
        paddingLeft: 17
    },
});
