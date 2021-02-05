import http from '../../helpers/http'

export const listGenre = (page) => {
  return async dispatch => {
    try {
      const response = await http().get(`genre?page=${page}`)
      dispatch({
        type: 'LIST_GENRE',
        payload: response.data.results,
        pageInfo: response.data.pageInfo
      })
    } catch(err) {
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
      const data = new URLSearchParams()
      data.append('name', name)
      const response = await http(token).post('genre', data)
      dispatch({
        type: 'CREATE_GENRE',
        payload: response.data.success
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CREATE_GENRE',
        payload: message
      })
    }
  }
}