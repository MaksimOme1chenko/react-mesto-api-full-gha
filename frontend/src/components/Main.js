import React, { useEffect, useState } from "react"
import Card from "./Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onLikeClick, onDeliteClick}) {

const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" alt="Аватарка" src={currentUser.avatar} />
          <button className="profile__avatar-button" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="cards">
          {cards.map((card) => {
            return <Card key={card._id} card={card} onCardClick={onCardClick} onLikeClick={onLikeClick} onDeliteClick={onDeliteClick}/>;
          })}
        </ul>
      </section>
    </main>
  )
}
export default Main