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

const updateInput = (ref, checked) => { // Синхронизация состояния checked с ref
    const input = ref.current;
    if (input) {
        input.checked = (checked === MEMB_STATE); // галочка, если MEMB_STATE
        input.indeterminate = (checked === VIST_STATE); // минус, если VIST_STATE
        // ничего, если false
    }
};

// Рассчитан только на три состояния
const ThreeStateCheckbox = ({name, checked, disabled, onChange}) => {
    const inputRef = useRef(FREE_STATE); // Состояние checkbox
    const checkedRef = useRef(checked); // Состояние для работы, синхронизируется с inputRef

    useEffect(() => { // вызывается, при создании checkbox (задание начального состояния)
        checkedRef.current = checked;
        updateInput(inputRef, checked);
    }, [checked]);

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

export const CheckBox = ({value = 0, disabled = false, onChange = null}) => {
    const [checked] = useState(value); // Значение по умолчанию

    return (
        <ThreeStateCheckbox checked={checked} disabled={disabled} onChange={onChange}/>
    );
};

export default CheckBox;