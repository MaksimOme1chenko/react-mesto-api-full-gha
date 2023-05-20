import React from "react";
import { Link } from "react-router-dom";
function Register({ onRegisterUser }) {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ``
  })
  function handleChange(e) {
    const { value, name } = e.target;
    setFormValue({ ...formValue, [name]: value })
  }

  function onSubmit(e) {
    e.preventDefault()
    onRegisterUser(formValue)
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="form__title">Регистрация</h1>
      <input className="form__input" value={formValue.email} placeholder="Email" name="email" id="email"  type="email" onChange={handleChange} required></input>
      <input className="form__input" value={formValue.password} placeholder="Пароль"  name="password" id="password" type="password" onChange={handleChange} required></input>
      <button className="form__save-button" type="submit">Зарегистрироваться</button>
      <p className="form__text">Уже зарегистрированны?<Link className="form__link" to="/sign-in"> Войти</Link></p>
    </form>
  )
}
export default Register
