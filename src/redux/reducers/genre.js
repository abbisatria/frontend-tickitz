const initialState = {
  results: null,
  pageInfo: null,
  success: null,
  errorMsg: ''
}

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_GENRE': {
      return {
        ...state,
        results: action.payload,
        pageInfo: action.pageInfo
      }
    }
    case 'CREATE_GENRE': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'SET_MESSAGE_CREATE_GENRE': {
      return {
        ...state,
        errorMsg: action.payload
      }
    }
    case 'SET_MESSAGE_GENRE': {
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

export default genreReducer