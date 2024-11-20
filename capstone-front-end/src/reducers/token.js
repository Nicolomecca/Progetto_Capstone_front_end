import { SET_TOKEN, REMOVE_TOKEN } from '../actions'

const initialState = {
    token: localStorage.getItem('token') || null
}

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case REMOVE_TOKEN:
            return {
                ...state,
                token: null
            }
        default:
            return state
    }
}

export default tokenReducer