import jwt from 'jwt-decode'
import http from '../../helpers/http'

export const login = (email, password) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('email', email)
    params.append('password', password)
    try {
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: ''
      })
      const results = await http().post('auth/login', params)
      const token = results.data.results.token
      const user = jwt(token)
      dispatch({
        type: 'LOGIN',
        payload: token,
        user: user
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: message
      })
    }
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const updateProfile = (token, id, data) => {
  return async (dispatch) => {
    const params = new FormData()
    if (data.firstname) {
      params.append('firstname', data.firstname)
    }
    if (data.lastname) {
      params.append('lastname', data.lastname)
    }
    if (data.phoneNumber) {
      params.append('phoneNumber', data.phoneNumber)
    }
    if (data.email) {
      params.append('email', data.email)
    }
    if (data.password) {
      params.append('password', data.password)
    }
    if (data.file) {
      params.append('image', data.file)
    }
    try {
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: ''
      })
      const results = await http(token).patch(
        `users/updateProfile/${id}`,
        params
      )
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: results.data.results,
        message: results.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: message
      })
    }
  }
}
