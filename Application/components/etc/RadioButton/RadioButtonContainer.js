import React, { useState, useEffect } from "react";
import RadioButton from "./RadioButton";

export default function RadioButtonContainer({ values, onPress, init }) {
    const [currentSelectedItem, setCurrentSelectedItem] = useState(init);

    const _onPress = (item) => {
        onPress(item);
        setCurrentSelectedItem(item);
    };

    const _renderRadioButtons = () => {
        return (values || []).map((item, idx) => {
            let isChecked = currentSelectedItem === item ? true : false;
            return (
                <RadioButton
                    key={idx}
                    onRadioButtonPress={() => _onPress(item)}
                    isChecked={isChecked}
                    text={item}
                />
            );
        });
    };
    return _renderRadioButtons();
}