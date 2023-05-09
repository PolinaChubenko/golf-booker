import {useEffect, useRef, useState} from 'react';
import style from "./CheckBox.module.css";

const FREE_STATE = 0 // свободно (пусто)
const MEMB_STATE = 1 // член клуба (галочка)
const VIST_STATE = 2 // посетитель (крестик)

const getNextState = (state) => { // правила переключения
    state += 1
    state %= 3
    return state
}

const updateInput = (ref, new_value) => { // Синхронизация состояния checked с ref
    const input = ref.current;
    if (input) {
        input.checked = (new_value === MEMB_STATE); // галочка, если MEMB_STATE
        input.indeterminate = (new_value === VIST_STATE); // минус, если VIST_STATE
    }
};

// Рассчитан только на три состояния
const ThreeStateCheckbox = ({name, value = 0, disabled = false, onChange = null}) => {
    const inputRef = useRef(null); // Состояние checkbox: [checked, indeterminate]
    const checkedRef = useRef(value); // Номер состояния inputRef

    useEffect(() => { // вызывается, при создании checkbox (задание начального состояния)
        checkedRef.current = value
        updateInput(inputRef, value);
    }, [value]);

    const handleClick = () => {
        checkedRef.current = getNextState(checkedRef.current)
        updateInput(inputRef, checkedRef.current);

        if (onChange) {
            onChange(checkedRef.current);
        }
    };
    return (
        <div style={{
            position: "relative",
            height: 34,
            width: 34,
        }}>
            <input ref={inputRef} type="checkbox" className={style.checkbox} name={name} onClick={handleClick} disabled={disabled}/>
        </div>
    );
};

export default ThreeStateCheckbox;