import React from 'react';
import holidayKR from "holiday-kr";
import RadioButtonContainer from "../etc/RadioButton/RadioButtonContainer";
import * as utils from "../etc/Util"

import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const DatabaseItem = ({ info, onItemPress, isChecked }) => {
    const getBornDate = (date) => {
        const year = date.year;
        const month = date.month;
        const day = date.day;
        const lunarDate = holidayKR.getLunar(year, month, day);
        return (
            <View style={styles.birth}>
                <Text style={styles.birth_text}>(양){year}-{utils.numberPad(month, 2)}-{utils.numberPad(day, 2)}</Text>
                <Text style={styles.birth_text}>(음){lunarDate.year}-{utils.numberPad(lunarDate.month, 2)}-{utils.numberPad(lunarDate.day, 2)}</Text>
            </View>
        )
    }

    const renderChecked = () => {
        return isChecked ? (
            <View style={styles.selectedItem}>
            </View>
        ) : null;
    };

    return (
        <TouchableOpacity style={styles.btn_item} onPress={onItemPress}>
            <View style={styles.name}>
                <Text style={styles.name_text}>{info.name}</Text>
            </View>
            {getBornDate(info.bornDate)}
            <View style={styles.born}>
                <Text style={styles.born_text}>{info.bornTime}</Text>
                <Text style={styles.born_text}>{info.gender}</Text>
            </View>
            <View style={styles.save}>
                <Text style={styles.save_text}>{utils.numberPad(info.saveTime.split('-')[0], 2)}-{utils.numberPad(info.saveTime.split('-')[1], 2)}-{utils.numberPad(info.saveTime.split('-')[2], 2)}</Text>
            </View>
            {renderChecked()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn_item: {
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        marginLeft: 6,
        width: '20%',
        alignItems: 'center',
    },
    name_text: {
        color: '#000',
        fontWeight: '500',
        fontSize: 15,
    },
    birth: {
        marginLeft: 5,
        width: '25%',
        alignItems: 'center',
    },
    birth_text: {
        color: '#000',
        fontWeight: '500',
        fontSize: 11,
    },
    born: {
        marginLeft: 10,
        width: '12%',
        alignItems: 'center',
    },
    born_text: {
        color: '#000',
        fontWeight: '500',
        fontSize: 12,
    },
    save: {
        marginLeft: 12,
        width: '28%',
        alignItems: 'center',
    },
    save_text: {
        color: '#000',
        fontWeight: '500',
        fontSize: 13,
    },
    selectedItem: {
        borderRadius: 20,
        width: 10,
        height: 10,
        backgroundColor: 'red',
    }
});

export default DatabaseItem;
