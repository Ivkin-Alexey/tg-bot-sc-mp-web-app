import {combineReducers} from "redux";
import {usersReducer} from "./usersReducer";
import {researchesReducer} from "./researchesReducer";
import {equipmentsReducer} from "./equipmentsReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    researches: researchesReducer,
    equipments: equipmentsReducer,
})

export default rootReducer;