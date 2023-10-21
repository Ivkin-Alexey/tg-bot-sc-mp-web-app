import constants from "../assets/constants/constants";

const {serverDomain, port} = constants;

export async function updatePersonData(chatID, formData, queryId) {
    const data = {
        formData,
        queryId,
        chatID
    };
    return await fetch(`https://${serverDomain}:${port}/updatePersonData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export async function deletePerson(chatID) {
    return await fetch(`https://${serverDomain}:${port}/deletePerson`, {
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
    return await fetch(`https://${serverDomain}:${port}/persons`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

