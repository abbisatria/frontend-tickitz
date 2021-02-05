const initialState = {
  results: null,
  pageInfo: null,
  success: null,
  errorMsg: ''
}

const cinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_CINEMA': {
      return {
        ...state,
        results: action.payload,
        pageInfo: action.pageInfo
      }
    }
    case 'CREATE_CINEMA': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'SET_MESSAGE_CINEMA': {
      return {
        ...state,
        errorMsg: action.payload,
        results: null,
        pageInfo: null
      }
    }
    case 'SET_MESSAGE_CREATE_CINEMA': {
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

export default cinemaReducer