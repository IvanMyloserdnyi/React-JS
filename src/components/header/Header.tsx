import React from "react"
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {HeaderPropsType} from "./HeaderContainer";



const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className={s.header}>
                <img className={s.logo}  src="https://www.freeiconspng.com/uploads/goose-png-27.png"/>
            <b className={s.label}>GUSSI GANG</b>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} <button onClick={props.logoutThunkCreator}>Logout</button></div>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}
export default Header