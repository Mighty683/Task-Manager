export default function Errors (state = {
  login: '',
  token: ''
}, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        login: action.login,
        token: action.token,
        time: new Date().getTime()
      }
    case 'USER_LOGOUT':
      return {
        login: '',
        token: '',
        time: new Date().getTime()
      }
    default:
      return state
  }
}
