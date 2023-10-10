// import {SET_NEXT_PAGE_URL, TOGGLE_FETCHING} from "./types";
//
// const initialState = {
//     url: 'https://pokeapi.co/api/v2/pokemon?limit=12',
//     fetching: true
// }
//
// export const appReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_NEXT_PAGE_URL:
//             return {url: action.url, fetching: false}
//         case TOGGLE_FETCHING:
//             return {...state, fetching: true}
//         default:
//             return state
//     }
// }