import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DelitePlacePopup from "./DelitePlacePopup";
import Register from "./Register";
import Login from "./Login";
import apiAuth from "../utils/apiAuth";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = React.useState(false);
  const [isAvatarProfilePopupOpen, setAvatarProfilePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isSelectedCard, setSelectedCard] = React.useState({});
  const [isDelitePopupOpen, setDelitePopupOpen] = React.useState(false);
  const [isSuccess, setSucces] = React.useState(true);
  const [isInfoToolipOpen, setInfoToolipOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleRegisterUser(inputValue) {
    apiAuth
      .register(inputValue)
      .then(() => {
        setInfoToolipOpen(true);
        setSucces(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setSucces(false);
        setInfoToolipOpen(true);
      });
  }

  function handeleLogin(inputValue) {
    apiAuth
      .authorize(inputValue)
      .then((data) => {
        setUserEmail(inputValue.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoToolipOpen(true);
        setSucces(false);
      });
  }

  function checkToken() {
    // const jwt = localStorage.getItem("jwt");
    // if(jwt) {
      apiAuth.getToken()
        .then((data) => {
            setUserEmail(data.email);
            setLoggedIn(true);
            navigate("/", { replace: true });
        })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    navigate("/sign-in", { replace: true });
    setUserEmail("");
    setLoggedIn(false);
    // localStorage.removeItem("jwt");
  }
  React.useEffect(() => {
    checkToken();
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddCardPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarProfilePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setImagePopupOpen(true);
  }

  function handleDeliteClick(card) {
    setSelectedCard(card);
    setDelitePopupOpen(true);
  }

  function handleOverlayClick(e) {
    if (
      e.target.classList.contains("popup_is-opened") ||
      e.target.classList.contains("popup__button-close")
    ) {
      closeAllPopups();
    }
  }

  function handleUpdateUser(newUserInfo, setButtonStatus) {
    setButtonStatus("Сохранение...");
    api
      .changeUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setButtonStatus("Сохранить"));
  }

  function handleUpdateAvatar(formData, setButtonStatus) {
    setButtonStatus("Сохранение...");
    api
      .changeUserAvatar(formData)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setButtonStatus("Сохранить"));
  }

  function handleAddCard(newCard, setButtonStatus) {
    setButtonStatus("Сохранение...");
    api
      .uploadNewCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setButtonStatus("Создать"));
  }

  function handleDeliteCard(setButtonStatus) {
    setButtonStatus("Удаление...");
    api
      .deleteCard(isSelectedCard._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== isSelectedCard._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setButtonStatus("Да"));
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setAvatarProfilePopupOpen(false);
    setImagePopupOpen(false);
    setDelitePopupOpen(false);
    setInfoToolipOpen(false);
  }
  return (
    <div>
      <Header email={userEmail} exit={handleLogout} />
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/sign-in" element={<Login onLogin={handeleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegisterUser={handleRegisterUser} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onDeliteClick={handleDeliteClick}
                onLikeClick={handleLikeClick}
              />
            }
          />
        </Routes>
        {loggedIn && <Footer />}
        {/* попап профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        {/* попап добавления карточки */}
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClick}
          onAddPlace={handleAddCard}
        ></AddPlacePopup>
        {/* попап обновления аватара */}
        <EditAvatarPopup
          isOpen={isAvatarProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        {/* попап удаления */}
        <DelitePlacePopup
          isOpen={isDelitePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClick}
          onDeletePlace={handleDeliteCard}
        ></DelitePlacePopup>
        {/* попап изображения */}
        <ImagePopup
          card={isSelectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        ></ImagePopup>
        <InfoTooltip
          isOpen={isInfoToolipOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClick}
          isSuccess={isSuccess}
        ></InfoTooltip>
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
