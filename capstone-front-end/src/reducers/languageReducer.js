// reducers/languageReducer.js

import {
    SET_LANGUAGES,
    FETCH_LANGUAGES_ERROR,
    FETCH_LANGUAGES_REQUEST
} from '../actions/languageActions';

const initialState = {
    languages: [],
    isLoading: false,
    error: null
};

export const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LANGUAGES_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case SET_LANGUAGES:
            return {
                ...state,
                languages: action.payload,
                isLoading: false,
                error: null
            };
        case FETCH_LANGUAGES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
export default languageReducer