import * as React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native';
import holidayKR from "holiday-kr";
import UserItem from '../components/search/UserItem';
import { useRef, useState } from 'react/cjs/react.development';
import * as utils from "../components/etc/Util"

const SearchScreen = ({ navigation }) => {
    const initialUserInfo = {
        name: "",
        gender: "남자",
        solar: "양력",
        job: "학생",
        bornDate: {
            year: "2000",
            month: "1",
            day: "1"
        },
        bornTime: "-"
    }

    const [users, setUsers] = useState([initialUserInfo]);

    const addUser = () => {
        const newUser = initialUserInfo;
        setUsers(users.concat(newUser));
    };
    const removeUser = (idx) => {
        setUsers(users.filter((item, i) => i !== idx));
    }

    // TODO
    const resetUser = () => {
        // setUsers(initialUserInfo)
    }
    const onChangeUserInfo = (idx, fname, fgender, fsolar, fjob, fbornDate, fbornTime) => {
        setUsers(
            users.map((item, i) =>
                i === idx
                    ? { ...item, name: fname, gender: fgender, solar: fsolar, job: fjob, bornDate: fbornDate, bornTime: fbornTime }
                    : item
            )
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.contents}>
                {users.map((item, i) => {
                    return <UserItem key={i} index={i} initialValue={item} onChange={onChangeUserInfo} onRemove={removeUser} />
                })}
            </ScrollView>
            <View style={styles.btn_area}>
                <TouchableOpacity
                    style={styles.btn_reset}
                    onPress={resetUser}>
                    <Text style={styles.btn_text}>초기화</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn_search}
                    onPress={() => {
                        let newUsers = [...users];
                        newUsers.map(item => {
                            if (item.solar === "음력") {
                                const year = item.bornDate.year;
                                const month = item.bornDate.month;
                                const day = item.bornDate.day;
                                const solarDate = holidayKR.getSolar(year, month, day);
                                item.bornDate = {
                                    year : solarDate.year,
                                    month : solarDate.month,
                                    day : solarDate.day
                                }
                                item.solar = "양력"
                            }
                        })
                        navigation.navigate('FateResult', { usersData: newUsers});
                        // SocketInstance.getInstance().send('RequestGetFate', newUsers);
                        // SocketInstance.getInstance().setResponseGetFateCallback((res) => {
                        //     SocketInstance.getInstance().send('RequestUserDB', "");
                        //     SocketInstance.getInstance().setResponseUserDBCallback((dbRes) => {
                        //         dbRes.map(item => {
                        //             if (!utils.globalUserDBArr.includes(item.name))
                        //                 utils.globalUserDBArr.push(item.name);
                        //         })
                        //         navigation.navigate('FateResult', { usersData: newUsers, fateRes: res.fate, bigFateRes: res.bigFate, yearsData: res.allYears, monthsData: res.threeMonths })
                        //     })
                        // })
                    }}>
                    <Text style={styles.btn_text}>조회하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn_add}
                    onPress={addUser}>
                    <Text style={styles.btn_text}>추가</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contents: {
        flex: 1,
        backgroundColor: 'gray',
    },
    btn_area: {
        height: 50,
        backgroundColor: 'brown',
        flexDirection: 'row',
    },
    btn_reset: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_search: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_add: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_text: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default SearchScreen;