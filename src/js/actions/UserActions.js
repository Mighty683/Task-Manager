import request from 'request-promise'

// User API
export const login = (login, pass) => {
  return (dispatch) => {
    return request({
      method: 'POST',
      uri: 'http://localhost:15432/login',
      body: {
        login,
        pass
      },
      json: true
    }).then(
      (res) => {
        dispatch(loginSuccess(login, res.token))
        dispatch(removeLoginError())
      })
      .catch((res) => {
        dispatch(loginError())
      })
  }
}
export const logout = (token) => {
  return (dispatch) => {
    return request({
      method: 'POST',
      uri: 'http://localhost:15432/logout',
      body: {
        token
      },
      json: true
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
