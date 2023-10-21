import constants from "../assets/constants/constants";
import {SET_USERS_DATA_IS_UPDATED} from "../redux/types";
const {serverDomain, port} = constants;

export async function updatePersonData(formData, queryId, chatID) {
    if(!formData || !queryId || !chatID) return;
    console.log(chatID)
    try {
        await fetch(`https://${serverDomain}:${port}/updateUserData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData,
                queryId,
                chatID
            })
        })
    } catch (e) {
        console.log(e);
    }
}

export async function deletePerson(chatID) {
    try {
        return await fetch(`https://${serverDomain}:${port}/deleteUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatID
            })
        })
            .then(res=>res.json())
    } catch (e) {
        console.log(e);
    }
}

export async function getUsers() {
        return fetch(`https://${serverDomain}:${port}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },}
        ).then(res => res.json())
}

