import React from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({isOpen, onClose, onOverlayClose, onAddPlace}) {

  const [cardName, setCardName] = React.useState('')
  const [cardLink, setCardLink] = React.useState('')
  const [buttonText, setButtonText] = React.useState('Создать')

  React.useEffect(() => {
    setCardName('')
    setCardLink('')
  }, [isOpen])

  function handleChangeName(e) {
    setCardName(e.target.value)
  };
  function handleChangeLink(e) {
    setCardLink(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    }, setButtonText);
  }

  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input" value={cardName || ''} onChange={handleChangeName} id="title-input" name="title" type="text" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="popup__input-error" id="title-input-error"></span>
      <input className="popup__input" value={cardLink || ''} onChange={handleChangeLink} id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required />
      <span className="popup__input-error" id="link-input-error"></span>
    </PopupWithForm>
  )
}
export default AddPlacePopup