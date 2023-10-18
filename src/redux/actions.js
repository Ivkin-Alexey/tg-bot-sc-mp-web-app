import {
    SET_USER_LIST, SET_ADMIN_LIST, SET_ACCOUNT_DATA, SET_USERS_DATA_IS_UPDATED
} from "./types";

import constants from "../assets/constants/constants";
const {admin, superAdmin} = constants.userRoles;
const {serverDomain, port} = constants;

export function fetchUsers(chatID) {
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
                        let admins = [];
                        let users = [];
                        let userData = {};
                       data.map(el => {
                            if(el.chatID === chatID) userData = el;
                            if(el.type === admin || el.type === superAdmin) admins.push(el);
                            else users.push(el);
                        });
                        dispatch({type: SET_USER_LIST, payload: users});
                        dispatch({type: SET_ACCOUNT_DATA, payload: userData});
                        dispatch({type: SET_ADMIN_LIST, payload: admins});
                    })
                    .then(() => {
                        dispatch({type: SET_USERS_DATA_IS_UPDATED, payload: true});
                    });
            } catch (e) {
                console.log(e);
            }
    }
}

// export function setUsers(data) {
//     return async dispatch => {
//                     let admins = [];
//                     let users = [];
//                     let userData = {};
//                     data.map(el => {
//                         if(el.chatID === chatID) userData = el;
//                         if(el.type === admin || el.type === superAdmin) admins.push(el);
//                         else users.push(el);
//                     });
//                     dispatch({type: SET_USER_LIST, payload: users});
//                     dispatch({type: SET_ACCOUNT_DATA, payload: userData});
//                     dispatch({type: SET_ADMIN_LIST, payload: admins});
//                     dispatch({type: SET_USERS_DATA_IS_UPDATED, payload: true});
//         }
//     }