const initialState = {
  results: null,
  details: {},
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
    case 'LIST_ALL_GENRE': {
      return {
        ...state,
        results: action.payload
      }
    }
    case 'DETAIL_GENRE': {
      return {
        ...state,
        details: action.payload
      }
    }
    case 'CREATE_GENRE': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'EDIT_GENRE': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'DELETE_GENRE': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'SET_MESSAGE_GENRE': {
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

export default genreReducer
