import React from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({isOpen, onClose, onOverlayClose, onUpdateAvatar}){
  
    const avatarRef = React.useRef() 
    const [buttonText, setButtonText] = React.useState('Сохранить')

    React.useEffect(() =>{
      avatarRef.current.value=''
    }, [isOpen])

      function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        }, setButtonText);
      } 

  return(
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      >
        <input ref={avatarRef} className="popup__input"  id="avatar-input" name="avatar" type="url" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error" id="avatar-input-error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup