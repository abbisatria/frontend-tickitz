const initialState = {
  results: null,
  resultsCheckOut: null,
  seatSold: [],
  seatChecked: null,
  errorMsg: ''
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ORDER': {
      return {
        ...state,
        results: action.payload
      }
    }
    case 'CHECKOUT': {
      return {
        ...state,
        resultsCheckOut: action.payload
      }
    }
    case 'DETAIL_TICKET': {
      return {
        ...state,
        resultsCheckOut: action.payload
      }
    }
    case 'SEAT_SOLD': {
      return {
        ...state,
        seatSold: action.payload
      }
    }
    case 'SEAT_CHECKED': {
      return {
        ...state,
        seatChecked: action.payload
      }
    }
    case 'SET_MESSAGE_SEAT_SOLD': {
      return {
        ...state,
        errorMsg: action.payload,
        seatSold: []
      }
    }
    case 'SET_MESSAGE_ORDER': {
      return {
        ...state,
        errorMsg: action.payload,
        results: null
      }
    }
    case 'SET_MESSAGE_CHECKOUT': {
      return {
        ...state,
        errorMsg: action.payload,
        resultsCheckOut: null
      }
    }
    case 'CLEAR_ORDER': {
      return {
        ...state,
        results: null,
        resultsCheckOut: null,
        seatSold: [],
        seatChecked: null,
        errorMsg: ''
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default orderReducer
