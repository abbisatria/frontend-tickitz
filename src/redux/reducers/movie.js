const initialState = {
  results: null,
  details: {},
  detailsGenre: null,
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
    case 'LIST_ALL_MOVIE': {
      return {
        ...state,
        results: action.payload
      }
    }
    case 'DETAIL_MOVIE': {
      return {
        ...state,
        details: action.payload
      }
    }
    case 'DETAIL_MOVIE_GENRE': {
      return {
        ...state,
        detailsGenre: action.payload
      }
    }
    case 'CREATE_MOVIE': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'EDIT_MOVIE': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'DELETE_MOVIE': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'SET_MESSAGE_MOVIE': {
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

export default movieReducer
