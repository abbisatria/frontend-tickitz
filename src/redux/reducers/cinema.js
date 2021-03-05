const initialState = {
  results: null,
  details: {},
  pageInfo: null,
  success: null,
  location: null,
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
    case 'LIST_LOCATION': {
      return {
        ...state,
        location: action.payload
      }
    }
    case 'DETAIL_CINEMA': {
      return {
        ...state,
        details: action.payload
      }
    }
    case 'CREATE_CINEMA': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'EDIT_CINEMA': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'DELETE_CINEMA': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'SET_MESSAGE_CINEMA': {
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
