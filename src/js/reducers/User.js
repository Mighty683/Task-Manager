export default function Errors (state = {
  login: '',
  pass: ''
}, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        login: action.login,
        token: action.token,
        time: new Date().getTime()
      }
    case 'USER_LOGOUT':
    default:
      return state
  }
}
