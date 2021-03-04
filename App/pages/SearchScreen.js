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
import UserItem from '../components/search/UserItem';
import { useRef, useState } from 'react/cjs/react.development';
import * as socketUtil from '../components/Socket/Socket';

const SearchScreen = () => {
    const initialUserInfo = {
        name: "",
        gender: 0,
        solar: 0,
        job: 0,
        bornDate: {
            year: "2000",
            month: "1",
            day: "1"
        },
        bornTime: {
            hour: "-1",
            min: "-1"
        }
    }

    const [users, setUsers] = useState([initialUserInfo]);

    const addUser = () => {
        const newUser = initialUserInfo;
        setUsers(users.concat(newUser));
    };

    const removeUser = (idx) => {
        setUsers(users.filter((item, i) => i !== idx));
    }

    const resetUser = () => {
        setUsers(initialUserInfo)
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
                        socketUtil.RequestFate(users);
                        // users.map((item, i) => {
                        //     console.log("조회하기 : " + "이름 : " + item.name + " 성별 : " + item.gender + " 양/음력 : " + item.solar + " 직업 : " + item.job + " 출생년월 : " + JSON.stringify(item.bornDate) + " 시간 : " + JSON.stringify(item.bornTime))
                        //     alert("번호 : " + item.idx + "\n이름 : " + item.name + "\n성별 : " + item.gender + "\n양/음력 : " + item.solar + "\n직업 : " + item.job + "\n출생년월 : " + JSON.stringify(item.bornDate) + "\n시간 : " + JSON.stringify(item.bornTime))
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