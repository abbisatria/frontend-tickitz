import http from '../../helpers/http'
import qs from 'querystring'

export const listCinema = (cond) => {
  return async dispatch => {
    try {
      const query = cond
        ? qs.stringify({
          ...cond
        })
        : {}
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: ''
      })
      const response = await http().get(`cinemas?${cond ? query : ''}`)
      dispatch({
        type: 'LIST_CINEMA',
        payload: response.data.results,
        pageInfo: response.data.pageInfo
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: message
      })
    }
  }
}

export const detailCinema = (id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: ''
      })
      const response = await http().get(`cinemas/${id}`)
      dispatch({
        type: 'DETAIL_CINEMA',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: message
      })
    }
  }
}

export const listLocation = () => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: ''
      })
      const response = await http().get('cinemas/location')
      dispatch({
        type: 'LIST_LOCATION',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: message
      })
    }
  }
}

export const createCinema = (token, name, location, file, price, address) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: ''
      })
      const data = new FormData()
      data.append('name', name)
      data.append('location', location)
      data.append('image', file)
      data.append('price', price)
      data.append('address', address)
      const response = await http(token).post('cinemas', data)
      dispatch({
        type: 'CREATE_CINEMA',
        payload: response.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: message
      })
    }
  }
}

export const editCinema = (token, id, name, location, file, price, address) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: ''
      })
      const data = new FormData()
      if (name !== '') {
        data.append('name', name)
      }
      if (location !== '') {
        data.append('location', location)
      }
      if (price !== '') {
        data.append('price', price)
      }
      if (address !== '') {
        data.append('address', address)
      }
      if (file !== null) {
        data.append('image', file)
      }
      const response = await http(token).patch(`cinemas/${id}`, data)
      dispatch({
        type: 'EDIT_CINEMA',
        payload: response.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: message
      })
    }
  }
}

export const deleteCinema = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: ''
      })
      const response = await http(token).delete(`cinemas/${id}`)
      dispatch({
        type: 'DELETE_CINEMA',
        payload: response.data.success
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: message
      })
    }
  }
}
