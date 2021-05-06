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
import firebase from '../firebaseconfig';
import Spinner from 'react-native-loading-spinner-overlay';
import fateDB from '../assets/fate_.json'

const MenuScreen = ({ navigation }) => {
    const [spinner, setSpinner] = useState(false);
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDate = date.getDate();


    const setYMD = () => {
        const prevMonth = date.getMonth() === 0 ? 12 : date.getMonth();
        const nextMonth = date.getMonth() + 2 === 13 ? 1 : date.getMonth();
        if (JSON.parse(localStorage.getItem("ymd_" + currentYear + currentMonth)) === null) {
            const ymd = fateDB.fate.filter(fate => fate.cd_sy === currentYear && fate.cd_sm === currentMonth.toString());
            localStorage.setItem("ymd_" + currentYear + currentMonth, JSON.stringify(ymd))
        }
        if (JSON.parse(localStorage.getItem("ymd_" + currentYear + prevMonth)) === null) {
            const ymd = fateDB.fate.filter(fate => fate.cd_sy === currentYear && fate.cd_sm === prevMonth.toString());
            localStorage.setItem("ymd_" + currentYear + prevMonth, JSON.stringify(ymd))
        }
        if (JSON.parse(localStorage.getItem("ymd_" + currentYear + nextMonth)) === null) {
            const ymd = fateDB.fate.filter(fate => fate.cd_sy === currentYear && fate.cd_sm === nextMonth.toString());
            localStorage.setItem("ymd_" + currentYear + nextMonth, JSON.stringify(ymd))
        }
    }
    const setYM = () => {
        for (let i = 1900; i < 2100 ; i ++) {
            if (JSON.parse(localStorage.getItem("ym_" + i)) === null) {
                const ym = fateDB.fate.filter(fate => fate.cd_sy === i && fate.cd_sd === (15).toString());
                localStorage.setItem("ym_" + i, JSON.stringify(ym))
            }
        }
    }

    async function setNearDate() {
        console.log("Start " + new Date().getSeconds());
        await setYMD();
        await setYM();

        // localStorage.setItem('ids', JSON.stringify(idArr))
        console.log("End " + new Date().getSeconds());
    }


    setNearDate();
    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={false}
                textContent={'Loading...'}
                textStyle={{ color: "#fff" }}
            />
            <View style={styles.container_row}>
                {/* Button Search */}
                <TouchableOpacity
                    style={[styles.container_button, styles.cb_search]}
                    onPress={() => {
                        // let isUUid = JSON.parse(localStorage.getItem("uuid"))
                        // if( !isUUid ){
                        //     console.log("321321")
                        //     const userId = uuid.v4();
                        //     localStorage.setItem('uuid', JSON.stringify(userId));
                        // } else {
                        //     console.log(isUUid)
                        // }
                        navigation.navigate('Search')
                    }}>
                    <Text>만세력</Text>
                </TouchableOpacity>
                {/* Button DB */}
                <TouchableOpacity
                    style={[styles.container_button, styles.cb_db]}
                    onPress={() => {
                        // navigation.navigate('Database', { userDataRes: res })
                        navigation.navigate('Database')
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
                    onPress={() => {
                        // navigation.navigate('SettingsStack', { screen: 'Settings' })
                        //alert("준비중")
                        // let userId = JSON.parse(localStorage.getItem("uuid"))
                        // firebase.firestore().collection('userData').doc(userId).delete();
                        // console.log("삭제되었습니다.")
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
