import {SET_RESEARCHES, SET_PERSONS_DATA_IS_UPDATED} from "../types.ts";
import {getResearches} from "../../methods/requestsToServer";

export function fetchResearchesAction() {
    return async dispatch => {
        dispatch({type: SET_PERSONS_DATA_IS_UPDATED, payload: false});
        try {
            getResearches().then(researchList => dispatch({type: SET_RESEARCHES, payload: researchList}));
        } catch (e) {
            console.log(e);
        }
    }
}