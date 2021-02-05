const initialState = {
  results: null,
  pageInfo: null,
  success: null,
  errorMsg: ''
}

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_MOVIE': {
      return {
        ...state,
        results: action.payload,
        pageInfo: action.pageInfo
      }
    }
    case 'CREATE_MOVIE': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'SET_MESSAGE_CREATE_MOVIE': {
      return {
        ...state,
        errorMsg: action.payload
      }
    }
    case 'SET_MESSAGE_MOVIE': {
      return {
        ...state,
        errorMsg: action.payload,
        results: null,
        pageInfo: null
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default movieReducer