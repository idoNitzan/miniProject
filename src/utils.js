import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

export const isLoggedIn = () => {
  const userToken = Cookies.get('userToken')
  if (!userToken) {
    return false
  }
  try {
    if (jwtDecode(userToken).userId) {
      return true
    }
    console.log(userToken)
  } catch (error) {
    Cookies.remove('userToken')
    return false
  }
}

export const logOut = () => {
  Cookies.remove('userToken')
  window.location.href = '/login'
}