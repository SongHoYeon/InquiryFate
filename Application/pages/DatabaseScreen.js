import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useEffect, useRef } from 'react/cjs/react.development';
import SocketInstance from '../components/Socket/Socket';
import DatabaseItem from '../components/database/DatabaseItem';
import { DefaultModalPopup } from '../components/etc/ModalPopup';
import * as utils from "../components/etc/Util"

const DatabaseScreen = ({ route, navigation }) => {
    const { userDataRes } = route.params;
    const [currentSelectedItem, setCurrentSelectedItem] = useState(-1);
    const [defaultModalPopupVisible, setDefaultModalPopupVisible] = useState(false);
    const defaultPopupMessage = useRef("");
    const [userDBArr, setUserDBArr] = useState([]);
    const onlyOneCall = useRef(false);

    if (!onlyOneCall.current) {
        let newArr = userDataRes.map(item => {
            return item.name;
        })
        setUserDBArr(newArr)
        onlyOneCall.current = true
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.option_group}>
                <TouchableOpacity
                    style={styles.btn_option}
                // onPress={() => }
                >
                    <Text style={styles.btn_option_text}>검색조건</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn_option}
                    onPress={() => {
                        if (currentSelectedItem === -1) {
                            setDefaultModalPopupVisible(true)
                            defaultPopupMessage.current = "삭제할 데이터가 없습니다."
                        } else {
                            setUserDBArr(userDBArr.filter(item => item !== userDataRes[currentSelectedItem].name))
                            setCurrentSelectedItem(-1);
                            SocketInstance.getInstance().send('RequestRemoveUser', userDataRes[currentSelectedItem].name);
                        }
                    }}>
                    <Text style={styles.btn_option_text}>삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn_option}
                // onPress={() => }
                >
                    <Text style={styles.btn_option_text}>백업</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn_option}
                // onPress={() => }
                >
                    <Text style={styles.btn_option_text}>복원</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.category_wrap}>
                <View style={[styles.category_name, styles.category_area]}><Text>이름</Text></View>
                <View style={[styles.category_birth, styles.category_area]}><Text>생일</Text></View>
                <View style={[styles.category_born, styles.category_area]}><Text>생시</Text></View>
                <View style={[styles.category_save, styles.category_area]}><Text>저장일</Text></View>
            </View>
            <ScrollView style={styles.contents}>
                <View style={styles.data_list}>
                    {
                        userDataRes.map((item, i) => {
                            if (userDBArr.includes(item.name)) {
                                let isChecked = currentSelectedItem === i ? true : false;
                                return <DatabaseItem key={item.name} info={item} onItemPress={() => setCurrentSelectedItem(i)} isChecked={isChecked} />
                            }
                        })
                    }
                </View>
            </ScrollView>
            <View style={styles.btn_area}>
                <TouchableOpacity
                    style={styles.btn_search}
                    onPress={() => {
                        if (currentSelectedItem === -1) {
                            setDefaultModalPopupVisible(true)
                            defaultPopupMessage.current = "불러올 사주를 선택하세요."
                        }
                        else {
                            const currentUserData = [{
                                name: userDataRes[currentSelectedItem].name,
                                gender: userDataRes[currentSelectedItem].gender,
                                job: userDataRes[currentSelectedItem].job,
                                bornDate: {
                                    year: userDataRes[currentSelectedItem].bornDate.split('-')[0],
                                    month: userDataRes[currentSelectedItem].bornDate.split('-')[1],
                                    day: userDataRes[currentSelectedItem].bornDate.split('-')[2]
                                },
                                bornTime: userDataRes[currentSelectedItem].bornTime,
                                solar: 0,
                            }]
                            SocketInstance.getInstance().send('RequestGetFate', currentUserData);
                            SocketInstance.getInstance().setResponseGetFateCallback((res) => {
                                navigation.navigate('FateResult', { usersData: currentUserData, fateRes: res.fate, bigFateRes: res.bigFate, yearsData: res.allYears, monthsData: res.threeMonths})
                            })
                        }
                    }}>
                    <Text style={styles.btn_text}>조회하기</Text>
                </TouchableOpacity>
                <DefaultModalPopup text={defaultPopupMessage.current} isVisible={defaultModalPopupVisible} onPressConfirm={() => { setDefaultModalPopupVisible(false); }} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
    option_group: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_option: {
        flex: 1,
        padding: 5,
    },
    btn_option_text: {
        marginTop: 5,
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
    },
    category_wrap: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
    },
    category_area: {
        backgroundColor: '#fff',
        textAlign: 'center',
        borderColor: '#000',
        borderWidth: 1,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    category_name: {
        width: '17%',
    },
    category_birth: {
        width: '33%',
    },
    category_born: {
        width: '15%',
    },
    category_save: {
        width: '35%',
    },
    contents: {
        flex: 1,
    },
    data_list: {
        marginLeft: 10,
        marginRight: 10,
    },
    btn_area: {
        height: 50,
        backgroundColor: 'brown',
        flexDirection: 'row',
    },
    btn_search: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    btn_text: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
export default DatabaseScreen;
