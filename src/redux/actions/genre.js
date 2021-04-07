import http from '../../helpers/http'
import qs from 'querystring'

export const listGenre = (cond) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: ''
      })
      const query = cond
        ? qs.stringify({
          ...cond
        })
        : {}
      const response = await http().get(`genre?${cond ? query : ''}`)
      dispatch({
        type: 'LIST_GENRE',
        payload: response.data.results,
        pageInfo: response.data.pageInfo
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: message
      })
    }
  }
}

export const listAllGenre = () => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: ''
      })
      const response = await http().get('genre/listAllGenre')
      dispatch({
        type: 'LIST_ALL_GENRE',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: message
      })
    }
  }
}

export const detailGenre = (id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: ''
      })
      const response = await http().get(`genre/${id}`)
      dispatch({
        type: 'DETAIL_GENRE',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: message
      })
    }
  }
}

export const createGenre = (token, name) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: ''
      })
      const data = new URLSearchParams()
      data.append('name', name)
      const response = await http(token).post('genre', data)
      dispatch({
        type: 'CREATE_GENRE',
        payload: response.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: message
      })
    }
  }
}

export const editGenre = (token, id, name) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: ''
      })
      const data = new URLSearchParams()
      data.append('name', name)
      const response = await http(token).patch(`genre/${id}`, data)
      dispatch({
        type: 'EDIT_GENRE',
        payload: response.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: message
      })
    }
  }
}

export const deleteGenre = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: ''
      })
      const response = await http(token).delete(`genre/${id}`)
      dispatch({
        type: 'DELETE_GENRE',
        payload: response.data.success
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: message
      })
    }
  }
}
