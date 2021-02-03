import http from '../../helpers/http'

export const order = (id) => {
  return async dispatch => {
    try {
      const response = await http().get(`showtimes/${Number(id)}`)
      dispatch({
        type: 'ORDER',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_ORDER_MESSAGE',
        payload: message
      })
    }
  }
}