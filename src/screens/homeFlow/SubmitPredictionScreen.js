import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput,
    TouchableWithoutFeedback, Keyboard
} from "react-native";
import Colors from "../../../assets/colors/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import {Header} from "react-native-elements";
import MyStyles from "../../../assets/styles/MyStyles";
import GradientButton from "react-native-gradient-buttons";


export default function SubmitPredictionScreen({navigation}) {
    const [guessFocus, setGuessFocus] = useState(false);
    const guessFocusStyle = guessFocus ? MyStyles.textInputFocus : MyStyles.textInputBlurred;

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header backgroundColor={Colors.darkBackground}
                        leftComponent={
                            <TouchableOpacity onPress={() => navigation.pop(1)}>
                                <Icon name={'ios-chevron-back'} size={30} color={'white'} style={{paddingLeft: 35}}/>
                            </TouchableOpacity>
                        }
                        leftContainerStyle={MyStyles.mainHeaderLeftContainer}
                        centerContainerStyle={MyStyles.mainHeaderCenterContainer}
                        centerComponent={<Text style={MyStyles.mainHeaderText}>YOUR PREDICTION</Text>}
                        containerStyle={MyStyles.mainHeaderContainer}
                />
                <Image source={require('../../../assets/images/virus.png')}
                       style={{width: 218, height: 143, marginTop: 47}}/>
                <Text style={styles.titleText}>Enter your prediction
                    {'\n'}for tomorrow:
                </Text>
                <TextInput
                    onFocus={() => setGuessFocus(true)}
                    onBlur={() => setGuessFocus(false)}
                    style={[MyStyles.defaultTextInput, guessFocusStyle, styles.guessyaTextInput]}
                    placeholder={'...'}
                    keyboardType={'number-pad'}
                    placeholderTextColor={'gray'}
                />
                <GradientButton
                    style={{marginVertical: 8, marginTop: 37, fontFamily: 'ProximaNova-Bold'}}
                    text="SUBMIT"
                    textStyle={{fontSize: 15, lineHeight: 18}}
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
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkBackground,
        flex: 1,
        alignItems: 'center'
    },
    titleText: {
        marginTop: 17,
        color: 'white',
        fontFamily: 'ProximaNova-Bold',
        fontSize: 25,
        textAlign: 'center'
    },
    guessyaTextInput: {
        width: 90,
        height: 90,
        fontSize: 30,
        marginTop: 60,
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5
    }

})
