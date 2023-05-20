import successIcon from '../images/icon.svg'
import failIcon from '../images/failIcon.svg'
function InfoTooltip({isOpen, onOverlayClose, onClose, isSuccess}){
    return(
        <div className={`popup ${isOpen ? "popup_is-opened" : ""}`} onClick={onOverlayClose}>  
            <div className="popup__container">
            <button className="popup__button-close" type="button" onClick={onClose}></button>
            <div className="info-toolip">
              <img className="info-toolip__image" src={isSuccess ? successIcon : failIcon}/>
              <p className="info-toolip__text">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
            </div>            
            </div>
        </div>
    )
}
export default InfoTooltip