import constants from "../assets/constants/constants";

const {serverDomain, port} = constants;

export async function updatePersonData(formData, queryId, chatID) {
    return await fetch(`https://${serverDomain}:${port}/updateUserData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            formData,
            queryId,
            chatID
        })
    }).then(res => res.json())
}

export async function deletePerson(chatID) {
    return await fetch(`https://${serverDomain}:${port}/deleteUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatID
        })
    }).then(res => res.json())
}

export async function getUsers() {
    return await fetch(`https://${serverDomain}:${port}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

