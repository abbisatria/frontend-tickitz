const initialState = {
  results: null,
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
    case 'SET_ORDER_MESSAGE': {
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

export default orderReducer
