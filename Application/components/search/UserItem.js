import React, { useState } from 'react';
import RadioButtonContainer from "../etc/RadioButton/RadioButtonContainer";
import Modal from "react-native-modal";
import { SelectModalPopup } from '../etc/ModalPopup';
import * as utils from '../etc/Util'

import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useEffect, useRef } from 'react/cjs/react.development';

const UserItem = ({ index, initialValue, onChange, onRemove }) => {
    const idx = index;
    // InputValues //
    const [name, setName] = useState(initialValue.name);
    // gender = 0 : 남자 / 1 : 여자
    const [gender, setGender] = useState(initialValue.gender);
    // solar = 0 : 양력 / 1 : 음력 / 2 : 음력윤달
    const [solar, setSolar] = useState(initialValue.solar);
    // bornAd = 0 : 서기 / 1 : 간지
    const [bornAdType, setBornAdType] = useState(0);
    const [bornDate, setBornDate] = useState(initialValue.bornDate);
    // time = 0 : 시분 / 1 : 간지 / 2 : 출생시 불명
    const [bornTimeType, setBornTimeType] = useState(0);
    const [bornTime, setBornTime] = useState(initialValue.bornTime);
    // job = 0 : 학생 / 1 : 개발자 / 2 : 기획자 / 3 : 디자이너
    const [job, setJob] = useState(0);

    const [selectModalPopupVisible, setSelectModalPopupVisible] = useState(false);
    const selectModalItems = useRef([]);
    const selectModalItemCallback = useRef(() => { });

    useEffect(() => {
        if (onChange) {
            onChange(idx, name, gender, solar, job, bornDate, bornTime)
        }
    }, [name, gender, solar, job, bornDate, bornTime]);
    useEffect(() => {
        setName(initialValue.name)
        setGender(initialValue.gender)
        setSolar(initialValue.solar)
        setBornDate(initialValue.bornDate)
        setBornTime(initialValue.bornTime)
        setJob(initialValue.job)
    }, [initialValue]);

    const _selectBornAdType_BtnText = () => {
        if (bornAdType === 0)
            return <Text style={styles.ia_btn_text}>서기로 입력</Text>
        else if (bornAdType === 1)
            return <Text style={styles.ia_btn_text}>간지 or 날짜로 입력</Text>
    }
    const _selectBornTimeType_BtnText = () => {
        if (bornTimeType === 0)
            return <Text style={styles.ia_btn_text}>시분 입력</Text>
        else if (bornTimeType === 1)
            return <Text style={styles.ia_btn_text}>간지 입력</Text>
        else
            return <Text style={styles.ia_btn_text}>출생시 불명</Text>
    }
    const _selectJob_BtnText = () => {
        if (job === 0)
            return <Text style={styles.ia_btn_text}>학생</Text>
        else if (job === 1)
            return <Text style={styles.ia_btn_text}>개발자</Text>
        else if (job === 2)
            return <Text style={styles.ia_btn_text}>디자이너</Text>
    }
    const _updateBornDate = (key, value) => {
        setBornDate({
            ...bornDate,
            [key]: value
        });
    };
    const _selectDate_InputArea = () => {
        if (bornAdType === 0) {
            return (<View style={styles.adborn_wrap}>
                <Text style={styles.adborn_title}>서기</Text>
                <TouchableOpacity
                    style={styles.ia_btn_modal}
                    onPress={() => {
                        selectModalItems.current = utils.yearArr;
                        selectModalItemCallback.current = (value) => { _updateBornDate('year', value + 1900) };
                        setSelectModalPopupVisible(true)
                    }}>
                    <Text style={styles.ia_btn_text}>{bornDate.year}</Text>
                </TouchableOpacity>
                <Text style={styles.adborn_unit_text}>년</Text>
                <TouchableOpacity
                    style={styles.ia_btn_modal}
                    onPress={() => {
                        selectModalItems.current = utils.monthArr;
                        selectModalItemCallback.current = (value) => { _updateBornDate('month', value + 1) };
                        setSelectModalPopupVisible(true)
                    }}>
                    <Text style={styles.ia_btn_text}>{bornDate.month}</Text>
                </TouchableOpacity>
                <Text style={styles.adborn_unit_text}>월</Text>
                <TouchableOpacity
                    style={styles.ia_btn_modal}
                    onPress={() => {
                        selectModalItems.current = utils.dayArr;
                        selectModalItemCallback.current = (value) => { _updateBornDate('day', value + 1) };
                        setSelectModalPopupVisible(true)
                    }}>
                    <Text style={styles.ia_btn_text}>{bornDate.day}</Text>
                </TouchableOpacity>
                <Text style={styles.adborn_unit_text}>일</Text>
            </View>)
        } else {
            return <Text style={styles.ia_btn_text}>간지 or 날짜로 입력</Text>
        }
    }
    const _selectTime_InputArea = () => {
        if (bornTimeType === 0) {
            return (<View style={styles.adborn_wrap}>
                <TouchableOpacity
                    style={styles.ia_btn_modal}
                    onPress={() => {
                        selectModalItems.current = utils.onlyTimeArr;
                        selectModalItemCallback.current = (idx) => { setBornTime(utils.timeArr[idx].hz) };
                        setSelectModalPopupVisible(true)
                    }}>
                    <Text style={styles.ia_btn_text}>
                        {utils.timeArr.map(item => {
                            return item.hz === bornTime ? item.hz + " " + item.time : "";
                        })}
                    </Text>
                </TouchableOpacity>
            </View>)
        }
        else if (bornTimeType === 1) {

        }
        else if (bornTimeType === 2) {

        }
    }

    return (
        <View>
            <View style={styles.head_wrap}>
                <Text style={styles.ha_text}>[사용자 {idx + 1}]</Text>
                {idx !== 0 ?
                    <TouchableOpacity
                        style={styles.ha_btn_remove}
                        onPress={() => {
                            onRemove(idx)
                        }}>
                        <Text style={{ color: "#fff" }}>X</Text>
                    </TouchableOpacity> : null
                }
            </View>
            <View style={styles.input_wrap}>
                <View style={styles.ia_group}>
                    <Text style={styles.ia_title}>이름</Text>
                    <TextInput style={styles.ia_input}
                        value={name}
                        placeholder="입력"
                        placeholderTextColor='gray'
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.ia_group}>
                    <Text style={styles.ia_title}>성별</Text>
                    <RadioButtonContainer values={[
                        { text: "남자", },
                        { text: "여자", }]}
                        init={gender}
                        onPress={(idx) => setGender(idx)} />
                </View>
                <View style={styles.ia_group}>
                    <Text style={styles.ia_title}>양/음력</Text>
                    <RadioButtonContainer values={[
                        { text: "양력", },
                        { text: "음력", },
                        { text: "음력윤달", }]}
                        init={solar}
                        onPress={(idx) => setSolar(idx)} />
                </View>
                <View style={styles.ia_group}>
                    <Text style={styles.ia_title}>출생정보</Text>
                    <View style={{ flex: 1, }}>
                        {/* <TouchableOpacity
                            style={styles.ia_btn_modal}
                            onPress={() => {
                                selectModalItems.current = ["서기로 입력", "간지 or 날짜로 입력"]
                                selectModalItemCallback.current = (idx) => setBornAdType(idx);
                                setSelectModalPopupVisible(true)
                            }}>
                            {_selectBornAdType_BtnText()}
                        </TouchableOpacity> */}
                        {_selectDate_InputArea()}
                    </View>
                </View>
                <View style={styles.ia_group}>
                    <Text style={styles.ia_title}>시 입력</Text>
                    <View style={{ flex: 1, }}>
                        {/* <TouchableOpacity
                            style={styles.ia_btn_modal}
                            onPress={() => {
                                selectModalItems.current = ["시분 입력", "간지 입력", "출생시 불명"]
                                selectModalItemCallback.current = (idx) => setBornTimeType(idx);
                                setSelectModalPopupVisible(true)
                            }}>
                            {_selectBornTimeType_BtnText()}
                        </TouchableOpacity> */}
                        {_selectTime_InputArea()}
                    </View>
                </View>
                <View style={styles.ia_group}>
                    <Text style={styles.ia_title}>직업</Text>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity
                            style={styles.ia_btn_modal}
                            onPress={() => {
                                selectModalItems.current = ["학생", "개발자", "디자이너"]
                                selectModalItemCallback.current = (idx) => setJob(idx);
                                setSelectModalPopupVisible(true)
                            }}>
                            {_selectJob_BtnText()}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <SelectModalPopup items={selectModalItems.current} isVisible={selectModalPopupVisible} onPressItem={(idx) => {
                setSelectModalPopupVisible(false);
                selectModalItemCallback.current(idx);
            }} />
        </View>
    );
};


const styles = StyleSheet.create({
    head_wrap: {
        height: 40,
        backgroundColor: 'blue',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    ha_text: {
        color: '#fff',
        fontWeight: '500',
        flex: 1,
    },
    ha_btn_remove: {
        padding: 5,
    },
    input_wrap: {
        padding: 10,
    },
    ia_group: {
        marginTop: 15,
        flexDirection: 'row',
    },
    ia_title: {
        marginTop: 4,
        width: 70,
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    ia_input: {
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: '#fff',
        borderRadius: 4,
        flex: 1,
    },
    ia_btn_modal: {
        flex: 1,
        paddingVertical: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 4,
        marginLeft: 5,
    },
    ia_btn_text: {
        marginLeft: 5,
    },
    adborn_wrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    adborn_title: {
        marginRight: 5,
        color: '#fff',
    },
    adborn_unit_text: {
        marginLeft: 3,
        color: '#fff',
    },
});

const modalStyles = StyleSheet.create({
    md_container: {
        width: 320,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    md_wrapper: {
        padding: 10,
    },
    md_title: {
        alignItems: 'center',
        fontSize: 18,
        fontWeight: '700',
    },
    md_btn_group: {
        marginTop: 10,
        marginLeft: 10,
    },
    md_btn: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    md_btn_text: {
        fontWeight: '500',
        fontSize: 14,
    }
});

export default UserItem;