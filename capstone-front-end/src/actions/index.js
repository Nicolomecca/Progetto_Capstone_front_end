export const SET_TOKEN = 'SET_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'

export const setTokenAction = (token) => {
    localStorage.setItem('token', token)
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export const removeTokenAction = () => {
    localStorage.removeItem('token')
    return {
        type: REMOVE_TOKEN
    }
}