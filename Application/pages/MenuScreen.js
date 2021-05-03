// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import * as utils from "../components/etc/Util"
import { useRef, useState } from 'react/cjs/react.development';
import 'localstorage-polyfill';
import uuid from 'react-native-uuid'
import firebase from '../firebaseconfig';

const MenuScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container_row}>
                {/* Button Search */}
                <TouchableOpacity
                    style={[styles.container_button, styles.cb_search]}
                    onPress={() => {
                        let isUUid = JSON.parse(localStorage.getItem("uuid"))
                        if( !isUUid ){
                            console.log("321321")
                            const userId = uuid.v4();
                            localStorage.setItem('uuid', JSON.stringify(userId));
                        } else {
                            console.log(isUUid)
                        }
                        navigation.navigate('Search')
                    }}>
                    <Text>만세력</Text>
                </TouchableOpacity>
                {/* Button DB */}
                <TouchableOpacity
                    style={[styles.container_button, styles.cb_db]}
                    onPress={() => {
                        // socket.send('RequestUserDB', "");
                        // socket.setResponseUserDBCallback((res) => {
                        //     utils.globalUserDBArr = [];
                        //     res.map(item => {
                        //         utils.globalUserDBArr.push(item.name);
                        //     })
                        //     navigation.navigate('Database', { userDataRes: res })
                        // })
                        let userId = JSON.parse(localStorage.getItem("uuid"))
                        firebase.firestore().collection('userData').doc(userId).get().then((doc) => {
                            if (doc.exists) {
                                console.log("Document data:", doc.data());
                            } else {
                                
                            }
                        }).catch((error) => {
                            console.log(error)
                        });
                    }}>
                    <Text>DataBase</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container_row}>
                {/* Button Today */}
                <TouchableOpacity
                    style={styles.container_button}
                    onPress={() => {
                        navigation.navigate('Calendar')
                    }}>
                    <Text>오늘의 일진(임시 달력)</Text>
                </TouchableOpacity>
                {/* Button TodayCard */}
                <TouchableOpacity
                    style={styles.container_button}
                    onPress={() =>{
                        // navigation.navigate('SettingsStack', { screen: 'Settings' })
                        //alert("준비중")
                        let userId = JSON.parse(localStorage.getItem("uuid"))
                        firebase.firestore().collection('userData').doc(userId).delete();
                        console.log("삭제되었습니다.")
                    }}>
                    <Text>일진카드 뽑기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    container_row: {
        flex: 1,
    },
    container_button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        fontSize: 100,
        color: 'red',
    },
    cb_search: {
        backgroundColor: 'blue',
    },
    cb_db: {
        backgroundColor: 'red',
    },
});
export default MenuScreen;
