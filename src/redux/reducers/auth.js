const initialState = {
  token: null,
  errorMsg: '',
  user: null,
  message: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        token: action.payload,
        user: action.user
      }
    }
    case 'SET_LOGIN_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: null,
        user: null,
        errorMsg: ''
      }
    }
    case 'UPDATE_PROFILE': {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        },
        message: action.message
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default authReducer
