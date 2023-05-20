function PopupWithForm({name, isOpen, onOverlayClose, onClose, title, buttonText, children, onSubmit}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`} onClick={onOverlayClose}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <form className="popup__form" onSubmit={onSubmit} name={name} action="#" method="post">
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__button-save" type="submit">{buttonText}</button>
        </form>
      </div>
    </section>
  )
}
export default PopupWithForm