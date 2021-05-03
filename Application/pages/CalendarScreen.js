import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { DefaultModalPopup } from '../components/etc/ModalPopup';
import _ from 'lodash'
import { useRef } from 'react/cjs/react.development';
import holidayKR from "holiday-kr";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
            + "(음력) " + lunarDate.year + " - " + numberPad(lunarDate.month, 2) + " - " + numberPad(lunarDate.day, 2);
    }
    return (
        <View style={styles.container}>
            <Calendar
                style={{
                    paddingTop: 30,
                }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: 'blue',
                    textMonthFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                }}
                onDayPress={(day) => { alert(JSON.stringify(day)) }}
                onDayLongPress={(day) => { console.log('selected day', day) }}
                monthFormat={'yyyy MM'}
                onMonthChange={(month) => { console.log('month changed', month) }}
                firstDay={1}
                showWeekNumbers={false}
                onPressArrowLeft={substractMonth => substractMonth()}
                onPressArrowRight={addMonth => addMonth()}
            />
            <DefaultModalPopup text={defaultPopupMessage.current} isVisible={defaultModalPopupVisible} onPressConfirm={() => { setDefaultModalPopupVisible(false); }} />
        </View>
    );

}

export default CalendarScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
