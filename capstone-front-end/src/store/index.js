import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from '../reducers/token'

const store = configureStore({
    reducer: {
        token: tokenReducer
    }
})

export default store