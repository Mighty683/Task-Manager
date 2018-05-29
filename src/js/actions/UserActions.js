import axios from 'axios'

// User API
export const login = (login, pass) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: 'http://localhost:15432/login',
      data: {
        login,
        pass
      },
      responseType: 'json'
    }).then(
      (res) => {
        console.log(res)
        dispatch(loginSuccess(login, res.data.token))
        dispatch(removeLoginError())
      })
      .catch((res) => {
        dispatch(loginError())
      })
  }
}
export const logout = (token) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: 'http://localhost:15432/logout',
      data: {
        token
      },
      responseType: 'json'
    }).then(
      (res, err) => {
        dispatch(logoutSuccess(login))
        dispatch(removeLoginError())
      })
  }
}
export const logoutSuccess = (login) => ({type: 'USER_LOGOUT'})
export const loginSuccess = (login, token) => ({type: 'USER_LOGIN', login: login, token: token})
export const loginError = () => ({type: 'LOGIN_ERROR'})
export const removeLoginError = () => ({type: 'REMOVE_LOGIN_ERROR'})
