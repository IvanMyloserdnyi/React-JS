import React from "react"
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
                <img className={s.logo}  src="https://www.freeiconspng.com/uploads/goose-png-27.png"/>
            <b className={s.label}>GUSSI GANG</b>
            <div className={s.loginBlock}>
                {props.isAuth? props.login :
                    <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}
export default Header