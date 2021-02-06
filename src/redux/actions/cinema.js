import http from '../../helpers/http'

export const listCinema = (page) => {
  return async dispatch => {
    try {
      const response = await http().get(`cinemas?page=${page}`)
      dispatch({
        type: 'LIST_CINEMA',
        payload: response.data.results,
        pageInfo: response.data.pageInfo
      })
    } catch(err) {
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
      const response = await http().get('cinemas/location')
      dispatch({
        type: 'LIST_LOCATION',
        payload: response.data.results
      })
    } catch(err) {
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
      const data = new FormData()
      data.append('name', name)
      data.append('location', location)
      data.append('image', file)
      data.append('price', price)
      data.append('address', address)
      const response = await http(token).post('cinemas', data)
      dispatch({
        type: 'CREATE_CINEMA',
        payload: response.data.success
      })
    } catch(err) {
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
      const response = await http(token).delete(`cinemas/${id}`)
      dispatch({
        type: 'DELETE_CINEMA',
        payload: response.data.success,
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: message
      })
    }
  }
}
