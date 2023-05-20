import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onLikeClick, onDeliteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked && "element__button-like_active"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onLikeClick(card);
  }

  function handleDeliteClick() {
    onDeliteClick(card);
  }

  return (
    <li className="element">
      <button className="element__image-button">
        <img
          className="element__image"
          alt={card.name}
          src={card.link}
          onClick={handleCardClick}
        />
      </button>
      {isOwn && (
        <button
          className="element__button-trash"
          onClick={handleDeliteClick}
          type="button"
        />
      )}
      <div className="element__title-container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <p className="element__quantity-like">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;
