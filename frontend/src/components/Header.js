import React from "react";
import logo from "../images/Vector.svg"
import { Link, Route, Routes } from "react-router-dom";
function Header({email, exit}) {
  return(
    <header className="header">
        <img className="header__logo" alt="Логотип" src={logo}/>
        <div className="header__info">
          <p className="header__email">{email}</p>
        <Routes>
          <Route path="/" element={<Link className="header__button header__main-button" onClick={exit} to={'sign-in'}>Выйти</Link>}/>
          <Route path='sign-in' element={<Link className="header__button" to={'/sign-up'}>Регистрация</Link>}/>
          <Route path="/sign-up" element={<Link className="header__button" to={'/sign-in'}>Войти</Link>}/>
        </Routes>
        </div>
      </header>
  )
}
export default Header