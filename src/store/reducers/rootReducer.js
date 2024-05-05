import {combineReducers} from "redux";
import {personsSlice} from "./personsSlice";
import {researchesSlice} from "./researchesSlice";
import {equipmentsSlice} from "./equipmentsSlice";
import {reagentsSlice} from "./reagentsSlice";
import {api} from "../api/api";

const rootReducer = combineReducers({
    persons: personsSlice,
    researches: researchesSlice,
    equipments: equipmentsSlice,
    reagents: reagentsSlice,
    [api.reducerPath]: api.reducer
})

export default rootReducer;