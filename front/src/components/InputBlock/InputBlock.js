import style from "./InputBlock.module.css";

const InputBlock = (props) => {
    return (
        <div className={style.input_block}>
            <input id={props.id}
                   type={props.type}
                   value={props.value}
                   onChange={props.onChange} required
                   placeholder={props.placeholder}></input>
        </div>
    )
}

export default InputBlock;