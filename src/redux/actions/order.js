import http from '../../helpers/http'

export const order = (id) => {
  return async dispatch => {
    try {
      const response = await http().get(`showtimes/${Number(id)}`)
      try {
        const seatSold = await http().get(`seats/${Number(id)}`)
        dispatch({
          type: 'SEAT_SOLD',
          payload: seatSold.data.results
        })
      } catch (err) {
        const { message } = err.response.data
        dispatch({
          type: 'SET_MESSAGE_SEAT_SOLD',
          payload: message
        })
      }
      dispatch({
        type: 'ORDER',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_ORDER',
        payload: message
      })
    }
  }
}

export const seatChecked = (seat) => ({
  type: 'SEAT_CHECKED',
  payload: seat
})

export const checkOut = (movieId, cinemaId, showtimesId, seat, token) => {
  return async dispatch => {
    const data = new URLSearchParams()
    data.append('idMovie', movieId)
    data.append('idCinema', cinemaId)
    data.append('idShowtime', showtimesId)
    seat.map(item => data.append('seat', item))
    try {
      const response = await http(token).post('transaction', data)
      dispatch({
        type: 'CHECKOUT',
        payload: response.data.results
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CHECKOUT',
        payload: message
      })
    }
  }
}

export const clearOrder = () => ({
  type: 'CLEAR_ORDER'
})

export const detailTicket = (token, id) => {
  return async dispatch => {
    try {
      const response = await http(token).get(`transaction/${id}`)
      dispatch({
        type: 'DETAIL_TICKET',
        payload: response.data.results
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MESSAGE_CHECKOUT',
        payload: message
      })
    }
  }
}
