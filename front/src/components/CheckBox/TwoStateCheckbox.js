import {useEffect, useRef, useState} from 'react';
import style from "./CheckBox.module.css";

const FREE_STATE = 0 // не подтверждено (пусто)
const CONF_STATE = 1 // подтверждено (галочка)

const getNextState = (state) => { // правила переключения
    state += 1
    state %= 2
    return state
}

const updateInput = (ref, new_value) => { // Синхронизация состояния checked с ref
    const input = ref.current;
    if (input) {
        input.checked = (new_value === CONF_STATE); // галочка, если MEMB_STATE
        input.indeterminate = (new_value === FREE_STATE); // минус, если VIST_STATE
    }
};

// Рассчитан только на два состояния
const TwoStateCheckbox = ({name, value = 0, disabled = false, onChange = null}) => {
    const inputRef = useRef(value); // Состояние checkbox: [checked, indeterminate]
    const checkedRef = useRef(value); // Номер состояния inputRef

    useEffect(() => { // вызывается, при создании и изменении value (защищает от изменения value без клика)
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

export default TwoStateCheckbox;