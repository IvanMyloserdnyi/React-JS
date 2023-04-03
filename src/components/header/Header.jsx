import React from "react"
import s from "./Header.module.css";

const Header = () => {
    return (
        <header className={s.header}>
                <img className={s.logo}  src="https://www.freeiconspng.com/uploads/goose-png-27.png"/>
            <b className={s.label}>GUSSI GANG</b>
        </header>
    )
}
export default Header