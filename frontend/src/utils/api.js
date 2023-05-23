  class Api {
    constructor({baseUrl, headers}) {
      this._url = baseUrl;
      this._headers = headers;
    }
    _checkResponse(res){
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`)
    }
  
  
    getUserInfo() {
      return fetch(`${this._url}/users/me`,{
        headers: this._headers,
        credentials: "include"
      }).then(this._checkResponse)
    }
  
    changeUserInfo(newUserInfo) {
      return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(newUserInfo),
      }).then(this._checkResponse)
    }
  
    changeUserAvatar ({ avatar }) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        credentials: "include",
        body: JSON.stringify({
          avatar: avatar,
      })
      }).then(this._checkResponse)
    }
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
        credentials: "include"
      }).then(this._checkResponse)
    }
  
    uploadNewCard(newCard) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        credentials: "include",
        body: JSON.stringify(newCard)
      }).then(this._checkResponse)
    }
    
    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
        credentials: "include",
      }).then(this._checkResponse)
    }
  
    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this._headers,
        credentials: "include"
      }).then(this._checkResponse)
    }
  }
  const api = new Api({
    baseUrl: 'https://api.spanko.mesto.nomoredomains.monster',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  export default api

//   fetch('https://auth.nomoreparties.co/signup', {
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 