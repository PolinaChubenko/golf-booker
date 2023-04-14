import {ajaxAuthService} from "../../../services/ajaxService";
import InputBlock from "../../InputBlock/InputBlock";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import style from "./AuthForm.module.css";

const AuthForm = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!password) {
            setError('введите пароль');
            return;
        }
        ajaxAuthService('/token/', {
            method: 'POST',
            body: JSON.stringify({ password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            window.localStorage.setItem("ACCESS", data.access);
            window.localStorage.setItem("REFRESH", data.refresh);
        }).then(() => {
            navigate(`/admin`, {replace: true});
        }).catch(() => {
            setError("неверные данные")
        });
    };

    const handleChangePassword = (event) => {
        setError('')
        setPassword(event.target.value);
    }

    return (
        <form className={style.auth_wrapper}>
            <fieldset>
                <div className={style.form_title_wrapper}>
                    <p className={style.form_title}>Авторизация администратора</p>
                </div>
                <InputBlock id={"login_password"} type={"password"} placeholder={"пароль"}
                            value={password} onChange={handleChangePassword}/>
                <div className={style.btn_wrapper}>
                    <p className={style.error}>{error}</p>
                    <button type="submit" className={style.signin_btn} onClick={handleSubmit}>войти</button>
                </div>

            </fieldset>
        </form>
    )
}

export default AuthForm;