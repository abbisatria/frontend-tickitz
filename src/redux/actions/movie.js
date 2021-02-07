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

export const listAllMovie = () => {
  return async dispatch => {
    try {
      const response = await http().get('movies/listAllMovie')
      dispatch({
        type: 'LIST_ALL_MOVIE',
        payload: response.data.results
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

export const detailMovie = (id) => {
  return async dispatch => {
    try {
      const response = await http().get(`movies/${id}`)
      dispatch({
        type: 'DETAIL_MOVIE',
        payload: response.data.results
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

export const detailMovieGenre = (id) => {
  return async dispatch => {
    try {
      const response = await http().get(`movies/detailGenre/${id}`)
      dispatch({
        type: 'DETAIL_MOVIE_GENRE',
        payload: response.data.results
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

export const editMovie = (token, id, name, genre, file, releaseDate, category, duration, directed, casts, description) => {
  return async dispatch => {
    try {
      const data = new FormData()
      if(name !== '') {
        data.append('name', name)
      }
      if(file !== null) {
        data.append('image', file)
      }
      if(releaseDate !== '') {
        data.append('releaseDate', releaseDate)
      }
      if(category !== '') {
        data.append('category', category)
      }
      if(directed !== '') {
        data.append('directed', directed)
      }
      if(duration !== '') {
        data.append('duration', duration)
      }
      if(casts !== '') {
        data.append('casts', casts)
      }
      if(description !== '') {
        data.append('description', description)
      }
      genre.map(item => data.append('idGenre', item))
      const response = await http(token).patch(`movies/${id}`, data)
      dispatch({
        type: 'EDIT_MOVIE',
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
