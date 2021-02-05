import { combineReducers } from 'redux'
import authReducer from './auth'
import orderReducer from './order'
import genreReducer from './genre'
import cinemaReducer from './cinema'
import movieReducer from './movie'

const reducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  genre: genreReducer,
  cinema: cinemaReducer,
  movie: movieReducer
})

export default reducer
