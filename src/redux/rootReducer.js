import {combineReducers} from "redux";
import {usersReducer} from "./usersReducer";
import {researchesReducer} from "./researchesReducer";
import {equipmentsReducer} from "./equipmentsReducer";
import {reagentsReducer} from "./reagentsReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    researches: researchesReducer,
    equipments: equipmentsReducer,
    reagents: reagentsReducer
})

export default rootReducer;