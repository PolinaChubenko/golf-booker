import style from "./Modal.module.css"

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? style.display_block : style.display_none;

    return (
        <div className={[showHideClassName, style.modal].join(" ")}>
            <section className={style.modal_main}>
                {children}
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
};

export default Modal;