// actions/languageActions.js
export const SET_LANGUAGES = 'SET_LANGUAGES'
export const FETCH_LANGUAGES_ERROR = 'FETCH_LANGUAGES_ERROR'
export const FETCH_LANGUAGES_REQUEST = 'FETCH_LANGUAGES_REQUEST'

export const setLanguagesAction = (languages) => ({
    type: SET_LANGUAGES,
    payload: languages
})

export const fetchLanguagesErrorAction = (error) => ({
    type: FETCH_LANGUAGES_ERROR,
    payload: error
})

export const fetchLanguagesRequestAction = () => ({
    type: FETCH_LANGUAGES_REQUEST
})

export const fetchLanguages = () => async (dispatch, getState) => {
    const token = getState().token.token;
    dispatch(fetchLanguagesRequestAction());
    try {
        const response = await fetch("http://localhost:3001/languages", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        if (response.ok) {
            const languages = await response.json();
            dispatch(setLanguagesAction(languages));
        } else {
            dispatch(fetchLanguagesErrorAction('Error loading languages'));
        }
    } catch (error) {
        dispatch(fetchLanguagesErrorAction(error.message));
    }
}