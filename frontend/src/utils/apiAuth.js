class ApiAuth {
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

      register(email, password){
        return fetch(`${this._url}/signup`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify( email, password )
        }).then(this._checkResponse)
      }

      authorize(email, password){
        return fetch(`${this._url}/signin`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify( email, password )
        })
        .then(this._checkResponse)
        .then((res) => {
          if(res.token){
            localStorage.setItem('jwt', res.token)
          }
          return res
        })  
      }

      getToken(token){
        return fetch(`${this._url}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          }
        }).then(this._checkResponse)
      }
}
const apiAuth = new ApiAuth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
})
export default apiAuth