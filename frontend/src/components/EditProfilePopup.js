import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup({isOpen, onClose, onOverlayClose, onUpdateUser}) {

const [name, setName] = React.useState('')
const [description, setDescription] = React.useState('')
const [buttonText, setButtonText] = React.useState('Сохранить')
const currentUser = React.useContext(CurrentUserContext);

React.useEffect(() => {
  setName(currentUser.name)
  setDescription(currentUser.about)
}, [currentUser, isOpen])

function handleChangeName(e){
  setName(e.target.value)
}

function handleChangeDescription(e){
  setDescription(e.target.value)
}

function handleSubmit(e){
  e.preventDefault()
  onUpdateUser({
    name, 
    about: description,
  }, setButtonText)
}

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input" onChange={handleChangeName} value={name || ''}  type="text"  id="name" name="name" placeholder="Ведите имя" minLength="2" maxLength="40" required />
      <span className="popup__input-error" id="name-error"></span>
      <input className="popup__input" onChange={handleChangeDescription} value={description || ''} id="profession" name="profession"  placeholder="Укажите профессию" minLength="2" maxLength="200" required />
      <span className="popup__input-error" id="profession-error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup