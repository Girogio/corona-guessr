import React from "react";
import {Platform, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {Header} from "react-native-elements";
import Colors from "../../../assets/colors/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import MyStyles from "../../../assets/styles/MyStyles";

export default function ProfileScreen({navigation}) {
    return (
        <View style={MyStyles.container}>
            <Header backgroundColor={Colors.darkBackground}
                    rightComponent={
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Icon name={'settings-outline'} size={30} color={'white'}/>
                        </TouchableOpacity>
                    }
                    centerComponent={
                        <Text style={MyStyles.mainHeaderText}>PROFILE</Text>
                    }

                    containerStyle={MyStyles.mainHeaderContainer}
                    rightContainerStyle={{marginRight: 20}}
                    centerContainerStyle={MyStyles.mainHeaderCenterContainer}
            />
        </View>
    )
}
