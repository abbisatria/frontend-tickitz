import http from '../../helpers/http'

export const createShowtime = (token, idMovie, showtimeDate, idCinema, showtime) => {
  return async dispatch => {
    try {
      const data = new URLSearchParams()
      data.append('idMovie', idMovie)
      data.append('showtimeDate', showtimeDate)
      idCinema.map(item => data.append('idCinema', item))
      showtime.map(item => data.append('showtime', `${item}:00`))
      const response = await http(token).post('showtimes', data)
      dispatch({
        type: 'CREATE_SHOWTIME',
        payload: response.data.success
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_SHOWTIME',
        payload: message
      })
    }
  }
}

export const cinemaLocation = (location) => {
  return async dispatch => {
    try {
      const data = new URLSearchParams()
      data.append('location', location)
      const response = await http().post('cinemas/cinemaLocation', data)
      dispatch({
        type: 'LIST_CINEMA_LOCATION',
        payload: response.data.results
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_SHOWTIME',
        payload: message
      })
    }
  }
}