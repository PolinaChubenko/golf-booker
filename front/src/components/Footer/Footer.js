import style from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={style.footer_wrapper}>
            &copy; 2023. Все права защищены.
            <br/> По всем вопросам пишите <a href="https://t.me/penguiners">автору проекта</a>
        </footer>
    )
}

export default Footer;