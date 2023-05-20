import PopupWithForm from "./PopupWithForm"
import React from "react"
function DelitePlacePopup({ isOpen, onClose, onOverlayClose, onDeletePlace }) {
  const [buttonText, setButtonText] = React.useState('Да')
  function handleSubmit(e) {
    e.preventDefault()
    onDeletePlace(setButtonText)
  }
  return (
    <PopupWithForm
      name={"confirm"}
      title={"Вы уверены?"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}
export default DelitePlacePopup