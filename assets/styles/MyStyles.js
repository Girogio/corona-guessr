import {Platform, StatusBar, StyleSheet} from "react-native";
import Colors from "../colors/Colors";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const MyStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkBackground,
        flex: 1,
        alignItems: 'center'
    },
    textInputFocus: {
        borderColor: Colors.lighterPrimary
    },
    textInputBlurred: {
        borderColor: Colors.darkerPrimary
    },
    defaultTextInput: {
        borderColor: Colors.darkerPrimary,
        borderRadius: 8,
        backgroundColor: '#1f1f1f',
        height: 48,
        width: 310,
        borderWidth: 2,
        fontFamily: 'ProximaNova-Regular',
        color: '#ffffff',
        marginTop: 25,
        paddingRight: 10,
        paddingLeft: 17
    },
    mainHeaderContainer: {
        backgroundColor: Colors.darkBackground,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2%'),
        borderBottomWidth: 0,
    },
    mainHeaderText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'ProximaNova-Bold',
        fontSize: 21,
    },

})
export default MyStyles;
