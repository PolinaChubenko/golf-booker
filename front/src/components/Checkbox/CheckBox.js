import React from 'react';

const updateInput = (ref, checked) => {
    const input = ref.current;
    if (input) {
        input.checked = checked;
        input.indeterminate = checked == null;
    }
    console.log(ref)
    console.log(checked)
};

const ThreeStateCheckbox = ({name, checked, onChange}) => {
    const inputRef = React.useRef(null); // Меняющееся значение checkbox
    const checkedRef = React.useRef(checked);
    React.useEffect(() => { // вызывается, епри рендере или если изменился checked
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
        if (onChange) {
            onChange(checkedRef.current);
        }
    };
    return (
        <input ref={inputRef} type="checkbox" name={name} onClick={handleClick} />
    );
};

export const CheckBox = () => {
    const [checked] = React.useState(false); //  Значение по умолчанию null

    return (
        <ThreeStateCheckbox checked={checked} />
    );
};

export default CheckBox;