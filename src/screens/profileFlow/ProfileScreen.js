import React, {useState} from "react";
import {Alert, Image, Platform, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {Header} from "react-native-elements";
import Colors from "../../../assets/colors/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import MyStyles from "../../../assets/styles/MyStyles";
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from 'react-native-image-picker';
import storage from 'firebase/storage';
import * as Progress from 'react-native-progress';


export default function ProfileScreen({navigation}) {
    const BadgedIcon = (MaterialCommunityIcons)
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const selectImage = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                const source = {uri: response.assets};
                setImage(response.assets);
            }
        });
    };

    const uploadImage = async () => {
        const {uri} = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
        const task = storage()
            .ref(filename)
            .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        setUploading(false);
        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setImage(null);
    };

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
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View>
                    <Image style={{width: 120, height: 120, borderRadius: 60}}
                           source={require('../../../assets/images/justin.jpg')}/>
                    <TouchableOpacity onPress={uploadImage()}>
                        <BadgedIcon type="MaterialCommunityIcons"
                                    name={"pencil-circle"}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 40,
                                        position: 'absolute',
                                        bottom: 5,
                                        right: -4,
                                        color: Colors.lighterPrimary
                                    }} size={30}
                        />
                    </TouchableOpacity>

                </View>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', paddingBottom: 20, marginLeft: 30}}>
                    <Text style={{color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 16}}>
                        {firebase.auth().currentUser.displayName}</Text>
                    <Text style={{color: 'gray', fontFamily: 'Poppins-Regular', fontSize: 16}}>
                        Apprentice Predictor
                    </Text>
                </View>
            </View>
        </View>
    )
}
