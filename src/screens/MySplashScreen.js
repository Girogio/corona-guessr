import React, {useState} from "react";
import {Image, View} from "react-native";

const MySplashScreen = () => {
    return (

        <View style={{backgroundColor: '#0c0c0c',flex:1}}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Image source={require('../../assets/images/name-logo.png')} style={{height: 71, width: 217, marginTop: 30}}/>
            </View>

            <Image source={require('../../assets/images/devlabel.png')} style={{height: 37, width: 96,alignSelf:'center',marginBottom: 80}}/>

        </View>

    )

}

export default SplashScreen;
