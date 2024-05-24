import {combineReducers} from "redux";
import {reducer as personReducer} from "./personsSlice";
import {reducer as researcheReducer} from "./researchesSlice";
import {reducer as equipmentReducer} from "./equipmentsSlice";
import {reducer as reagentReducer} from "./reagentsSlice";
import {api} from "../api/api";

const rootReducer = combineReducers({
    persons: personReducer,
    researches: researcheReducer,
    equipments: equipmentReducer,
    reagents: reagentReducer,
    [api.reducerPath]: api.reducer
})

export default rootReducer;