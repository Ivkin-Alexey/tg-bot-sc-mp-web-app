import {combineReducers} from "redux";
import {personsSlice} from "./personsSlice";
import {researchesSlice} from "./researchesSlice";
import {equipmentsSlice} from "./equipmentsSlice";
import {reagentsSlice} from "./reagentsSlice";

const rootReducer = combineReducers({
    persons: personsSlice,
    researches: researchesSlice,
    equipments: equipmentsSlice,
    reagents: reagentsSlice
})

export default rootReducer;