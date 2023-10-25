import {combineReducers} from "redux";
import {usersReducer} from "./usersReducer";
import {researchesReducer} from "./researchesReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    researches: researchesReducer,
})

export default rootReducer;