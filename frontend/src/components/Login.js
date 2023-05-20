import React from "react";

function Login({ onLogin }){
    const [formValue, setFormValue] = React.useState({
      email: '', 
      password: ''
    })

    function handleChange(e) {
      const { value, name } = e.target;
      setFormValue({ ...formValue, [name]: value })
    }

    function onSubmit(e){
      e.preventDefault()
      onLogin(formValue)
    }

    return (
      <form className="form" onSubmit={onSubmit}>
        <h1 className="form__title">Вход</h1>
        <input className="form__input" value={formValue.email} placeholder="Email" name="email" id="email"  type="email" onChange={handleChange} required></input>
        <input className="form__input" value={formValue.password} placeholder="Пароль"  name="password" id="password" type="password" onChange={handleChange} required></input>
        <button className="form__save-button" type="submit">Войти</button>
      </form>
    )
}
export default Login