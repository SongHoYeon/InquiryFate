import Modal from "react-native-modal";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React from "react";
import { useEffect, useRef } from 'react/cjs/react.development';

export const DefaultModalPopup = ({ text, isVisible, onPressConfirm }) => {
    return (
        <Modal
            isVisible={isVisible}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={modalStyles.md_container}>
                <View style={modalStyles.md_message_wrap}>
                    <Text style={modalStyles.md_message}>{text}</Text>
                    <View style={modalStyles.mdm_btn_wrap}>
                        <TouchableOpacity
                            style={modalStyles.mdm_btn}
                            onPress={onPressConfirm}>
                            <Text style={modalStyles.mdm_btn_text}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export const SelectModalPopup = ({ items, isVisible, onPressItem }) => {
    return (
        <Modal
            isVisible={isVisible}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={modalStyles.md_container}>
                <Text style={modalStyles.md_title}>입력 유형 선택</Text>
                <ScrollView style={modalStyles.md_select_wrap}>
                    {items.map((item, i) => {
                        return <TouchableOpacity
                            key={i} style={modalStyles.md_btn}
                            onPress={() => {
                                onPressItem(i)
                            }}>
                            <Text style={modalStyles.md_btn_text}>{item}</Text>
                        </TouchableOpacity>
                    })}
                </ScrollView>
            </View>
        </Modal>
    )
}

const modalStyles = StyleSheet.create({
    md_container: {
        width: 320,
        backgroundColor: '#fff',
        borderRadius: 10,
        maxHeight: 700,
    },
    md_title: {
        alignItems: 'center',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
        marginTop: 20,
    },
    md_message_wrap: {
        alignItems: 'center',
    },
    md_message: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 16,
        fontWeight: '500',
    },
    mdm_btn_wrap: {
        flexDirection: 'row',
    },
    mdm_btn: {
        flex: 1,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    mdm_btn_text: {
        color: '#000',
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 10,
    },
    md_select_wrap: {
        marginVertical: 10,
        marginLeft: 15,
    },
    md_btn: {
        paddingVertical: 10,
    },
    md_btn_text: {
        fontWeight: '500',
        fontSize: 14,
    }
});
