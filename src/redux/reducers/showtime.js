const initialState = {
  results: null,
  pageInfo: null,
  success: null,
  errorMsg: ''
}

const showtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_SHOWTIME': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'LIST_CINEMA_LOCATION': {
      return {
        ...state,
        results: action.payload,
        errorMsg: ''
      }
    }
    case 'SET_MESSAGE_SHOWTIME': {
      return {
        ...state,
        errorMsg: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default showtimeReducer
