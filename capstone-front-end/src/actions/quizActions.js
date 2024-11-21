// quizActions.js

export const SET_QUESTIONS = 'SET_QUESTIONS'
export const SET_CURRENT_LANGUAGE = 'SET_CURRENT_LANGUAGE'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

export const setQuestionsAction = (questions) => ({
    type: SET_QUESTIONS,
    payload: questions
})

export const setCurrentLanguageAction = (language) => ({
    type: SET_CURRENT_LANGUAGE,
    payload: language
})

export const setLoadingAction = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading
})

export const setErrorAction = (error) => ({
    type: SET_ERROR,
    payload: error
})

export const fetchQuizQuestions = (languageName) => {
    return async (dispatch, getState) => {
        const token = getState().token.token
        dispatch(setLoadingAction(true))
        dispatch(setErrorAction(null))
        try {
            const response = await fetch(`http://localhost:3001/assessment/${languageName}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }
            const questions = await response.json()
            dispatch(setQuestionsAction(questions))
            dispatch(setCurrentLanguageAction(languageName))
        } catch (error) {
            console.error("Error in fetchQuizQuestions:", error)
            dispatch(setErrorAction(error.message))
        } finally {
            dispatch(setLoadingAction(false))
        }
    }
}