import {
    FETCH_USERS, SET_USER_DATA
} from "./types";

import constants from "../assets/constants/constants";
const {serverDomain, port} = constants;

export function fetchUsers(userChatID) {
    return async dispatch => {
            try {
                fetch(`https://${serverDomain}:${port}/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },}
                )
                    .then(res => res.json())
                    .then(data => {
                        dispatch({type: FETCH_USERS, payload: data});
                        const userData = data.find(el=>el.chatID === userChatID);
                        dispatch({type: SET_USER_DATA, payload: userData})
                    });
            } catch (e) {
                console.log(e);
            }
    }
}