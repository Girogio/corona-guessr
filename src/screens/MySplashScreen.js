import React from "react";
import {Image, StatusBar, View} from "react-native";
import {Video, AVPlaybackStatus} from "expo-av";

export default function MySplashScreen() {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <View style={{backgroundColor: '#0c0c0c', flex: 1}}>
            <StatusBar style="light"/>

            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Video source={require('../../assets/images/GuessyaAnimSplashscreen.mp4')}
                       style={{height: 1080, width: 1920, scaleX: 0.15, scaleY: 0.15, alignSelf: 'center', marginBottom: 80}}
                       controls={false}
                       ref={video}
                       onPlaybackStatusUpdate={status => setStatus(() => status)}
                       onLoad={() => video.current.playAsync()}
                       resizeMode="stretch"
                />
            </View>

            <Image

                source={require('../../assets/images/devlabel.png')}
                style={{height: 37, width: 96, alignSelf: 'center', marginBottom: 80}}/>
        </View>

    )

}

