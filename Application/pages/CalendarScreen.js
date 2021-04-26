import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import DateTime from 'react-native-customize-selected-date'
import { DefaultModalPopup } from '../components/etc/ModalPopup';
import _ from 'lodash'
import { useRef } from 'react/cjs/react.development';
import holidayKR from "holiday-kr";
// import SocketInstance from '../components/Socket/Socket';

const CalendarScreen = () => {
    // const socket = SocketInstance.getInstance();
    const [defaultModalPopupVisible, setDefaultModalPopupVisible] = useState(false);
    const defaultPopupMessage = useRef("");
    const time = '';
    const numberPad = (n, width) => {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }
    const onSelectDate = (date) => {
        const year = date.split('-')[0]
        const month = date.split('-')[1]
        const day = date.split('-')[2]
        const lunarDate = holidayKR.getLunar(year, month, day);
        setDefaultModalPopupVisible(true)
        defaultPopupMessage.current = 
        "(양력) " + year + " - " + month + " - " + day + "\n"
        + "(음력) " + lunarDate.year + " - " + numberPad(lunarDate.month,2) + " - " + numberPad(lunarDate.day,2);
    }
    return (
        <View style={styles.container}>
            <DateTime
                date={time}
                changeDate={(date) => onSelectDate(date)}
                format='YYYY-MM-DD'
                // socket={SocketInstance.getInstance()}
            />
            <DefaultModalPopup text={defaultPopupMessage.current} isVisible={defaultModalPopupVisible} onPressConfirm={() => { setDefaultModalPopupVisible(false); }} />
        </View>
    );

}

export default CalendarScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
});
