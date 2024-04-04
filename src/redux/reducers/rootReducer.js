import {combineReducers} from "redux";
import {personsReducer} from "./personsReducer";
import {researchesReducer} from "./researchesReducer";
import {equipmentsReducer} from "./equipmentsReducer";
import {reagentsReducer} from "./reagentsReducer";

const rootReducer = combineReducers({
    persons: personsReducer,
    researches: researchesReducer,
    equipments: equipmentsReducer,
    reagents: reagentsReducer
})

export default rootReducer;