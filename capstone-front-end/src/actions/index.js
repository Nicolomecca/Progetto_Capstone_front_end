export const SET_TOKEN = 'SET_TOKEN'

export const SetTokenAction = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    }
}
