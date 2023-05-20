function ImagePopup({name, isOpen, onClose, onOverlayClick, card}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`}  onClick={onOverlayClick}>
      <div className="popup__image-container">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h3 className="popup__signature">{card.name}</h3>
      </div>
    </section >)
}
export default ImagePopup