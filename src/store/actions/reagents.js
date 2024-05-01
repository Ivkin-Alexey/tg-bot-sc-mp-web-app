import {deleteReagentApplication, updateReagentApplication} from "../../methods/requestsToServer";
import {SET_REAGENTS_APPLICATIONS, SET_REAGENTS_DATA_IS_UPDATED} from "../types.ts";

export function updateReagentApplicationsAction(accountChatID, data) {
    return async dispatch => {
        dispatch({type: SET_REAGENTS_DATA_IS_UPDATED, payload: false});
        try {
            updateReagentApplication(accountChatID, data)
                .then(data => {
                    console.log(data);
                    dispatch({type: SET_REAGENTS_APPLICATIONS, payload: data})
                    dispatch({type: SET_REAGENTS_DATA_IS_UPDATED, payload: true})
                });
        } catch (e) {
            console.log(e);
        }
    }
}

export function deleteReagentApplicationAction(accountChatID, applicationID) {
    return async dispatch => {
        dispatch({type: SET_REAGENTS_DATA_IS_UPDATED, payload: false});
        try {
            deleteReagentApplication(accountChatID, applicationID)
                .then(data => {
                    dispatch({type: SET_REAGENTS_APPLICATIONS, payload: data})
                    dispatch({type: SET_REAGENTS_DATA_IS_UPDATED, payload: true})
                });
        } catch (e) {
            console.log(e);
        }
    }
}