import React from 'react';

const updateInput = (ref, checked) => { // Синхронизация состояния checked с ref
    const input = ref.current;
    if (input) {
        input.checked = checked; // галочка, если true
        input.indeterminate = checked == null; // минус, если null
        // ничего, если false
    }
};

// Рассчитан только на три состояния
const ThreeStateCheckbox = ({name, checked, onChange}) => {
    const inputRef = React.useRef(null); // Состояние checkbox
    const checkedRef = React.useRef(checked); // Состояние для работы, синхронизируем с inputRef
    React.useEffect(() => { // вызывается, при создании checkbox (задание начального состояния)
        checkedRef.current = checked;
        updateInput(inputRef, checked);
    }, [checked]);
    const handleClick = () => { // правила переключения
        switch (checkedRef.current) {
            case false:
                checkedRef.current = true;
                break;
            case true:
                checkedRef.current = null;
                break;
            default: // null
                checkedRef.current = false;
                break;
        }
        updateInput(inputRef, checkedRef.current);
        // if (onChange) {
        //     onChange(checkedRef.current);
        // }
    };
    return (
        <input ref={inputRef} type="checkbox" name={name} onClick={handleClick} />
    );
};

// 1 : false (пустое)
// 2 : true (галочка)
// 3 : null (минус)

export const CheckBox = () => {
    const [checked] = React.useState(true); // Значение по умолчанию

    return (
        <ThreeStateCheckbox checked={checked} />
    );
};

export default CheckBox;