import { React, useState, useRef } from 'react';
import { NumericFormat } from 'react-number-format';

export default function PhoneNumberInput (props) {
    const [number, setNumber] = useState();

    const numberInput = (props) => {
      setNumber(props)
    }
    return (
      <NumericFormat 
        type="tel"
        format="(###) ###-####" 
        mask="_" 
        value={number}
        onValueChange={numberInput(props)}
        required
      />

        )
}