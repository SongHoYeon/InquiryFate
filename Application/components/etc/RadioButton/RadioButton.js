import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RadioButton({ isChecked, text, onRadioButtonPress }) {
  const _renderCheckedView = () => {
    return isChecked ? (
      <View style={[styles.radioButtonIconInnerIcon]} />
    ) : null;
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onRadioButtonPress}>
        <View style={[styles.radioButtonIcon]}>{_renderCheckedView()}</View>
        <View style={[styles.radioButtonTextContainer]}>
            <Text style={styles.radioButtonText}>{text}</Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: 100,
    height: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonIcon: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "red",
    height: 20,
    width: 20,
    borderRadius: 30 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIconInnerIcon: {
    height: 20,
    width: 20,
    backgroundColor: "red",
    borderRadius: 25 / 2,
    borderWidth: 2,
    borderColor: "white",
  },
  radioButtonTextContainer: {
    paddingLeft: 5,
  },
  radioButtonText: {
    fontSize: 15,
    color:'#fff',
  },
});