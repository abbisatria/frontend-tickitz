import http from '../../helpers/http'

export const listMovie = (page) => {
  return async dispatch => {
    try {
      const response = await http().get(`movies?page=${page}`)
      dispatch({
        type: 'LIST_MOVIE',
        payload: response.data.results,
        pageInfo: response.data.pageInfo
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_MOVIE',
        payload: message
      })
    }
  }
}

export const createMovie = (token, name, genre, file, releaseDate, category, duration, directed, casts, description) => {
  return async dispatch => {
    try {
      const data = new FormData()
      data.append('name', name)
      if(file !== null) {
        data.append('image', file)
      }
      data.append('releaseDate', releaseDate)
      data.append('category', category)
      data.append('directed', directed)
      data.append('duration', duration)
      data.append('casts', casts)
      data.append('description', description)
      genre.map(item => data.append('idGenre', item))
      const response = await http(token).post('movies', data)
      dispatch({
        type: 'CREATE_MOVIE',
        payload: response.data.success
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_MOVIE',
        payload: message
      })
    }
  }
}

export const deleteMovie = (token, id) => {
  return async dispatch => {
    try {
      const response = await http(token).delete(`movies/${id}`)
      dispatch({
        type: 'DELETE_MOVIE',
        payload: response.data.success,
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_MOVIE',
        payload: message
      })
    }
  }
}
