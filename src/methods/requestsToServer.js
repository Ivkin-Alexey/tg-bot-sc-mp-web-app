import constants from "../assets/constants/constants";

const {serverDomain, port} = constants;

export async function updatePersonData(chatID, formData, queryId) {
    const data = {
        formData,
        queryId,
        chatID
    };
    return await fetch(`https://${serverDomain}:${port}/updatePersonData`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export async function deletePerson(chatID) {
    return await fetch(`https://${serverDomain}:${port}/deletePerson`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatID
        })
    }).then(res => res.json())
}

export async function startWorkWithEquipment(chatID, accountData, equipment) {
    return await fetch(`https://${serverDomain}:${port}/equipmentStart`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatID, accountData, equipment
        })
    }).then(res => res.json())
}

export async function endWorkWithEquipment(chatID, accountData, equipment) {
    return await fetch(`https://${serverDomain}:${port}/equipmentEnd`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatID, accountData, equipment
        })
    }).then(res => res.json())
}

export async function getUsers() {
    return await fetch(`https://${serverDomain}:${port}/persons`, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

export async function getEquipments() {
    return await fetch(`https://${serverDomain}:${port}/equipmentList`, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

export async function getResearches() {
    return await fetch(`https://${serverDomain}:${port}/researches`, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

