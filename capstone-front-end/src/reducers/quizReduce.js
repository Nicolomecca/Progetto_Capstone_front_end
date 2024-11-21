// // quizReducer.js
// import {
//     SET_QUESTIONS,
//     SET_CURRENT_LANGUAGE,
//     SET_LOADING,
//     SET_ERROR
// } from '../actions/quizActions.js'

// const initialState = {
//     questions: [],
//     currentLanguage: '',
//     isLoading: false,
//     error: null
// }

// const quizReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_QUESTIONS:
//             return {
//                 ...state,
//                 questions: action.payload
//             }
//         case SET_CURRENT_LANGUAGE:
//             return {
//                 ...state,
//                 currentLanguage: action.payload
//             }
//         case SET_LOADING:
//             return {
//                 ...state,
//                 isLoading: action.payload
//             }
//         case SET_ERROR:
//             return {
//                 ...state,
//                 error: action.payload
//             }
//         default:
//             return state
//     }
// }

// export default quizReducer