import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from '../reducers/token'
import languageReducer from '../reducers/languageReducer'
const store = configureStore({
    reducer: {
        token: tokenReducer,
        languages: languageReducer
    }
})

export default store