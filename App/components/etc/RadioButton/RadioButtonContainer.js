import React, { useState, useEffect } from "react";
import RadioButton from "./RadioButton";

export default function RadioButtonContainer({ values, onPress, init }) {
    const [currentSelectedItem, setCurrentSelectedItem] = useState(init);

    const _onPress = (idx) => {
        onPress(idx);
        setCurrentSelectedItem(idx);
    };

    const _renderRadioButtons = () => {
        return (values || []).map((listItem, idx) => {
            let isChecked = currentSelectedItem === idx ? true : false;
            return (
                <RadioButton
                    key={idx}
                    onRadioButtonPress={() => _onPress(idx)}
                    isChecked={isChecked}
                    text={listItem.text}
                />
            );
        });
    };
    return _renderRadioButtons();
}