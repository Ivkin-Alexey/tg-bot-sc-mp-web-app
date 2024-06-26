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

export async function startWorkWithEquipment(chatID, accountData, equipment) {
    return await fetch(`https://${serverDomain}:${port}/equipmentStart`, {
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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatID, accountData, equipment
        })
    }).then(res => res.json())
}

export async function getPersons() {
    return await fetch(`https://${serverDomain}:${port}/persons`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

export async function getEquipments() {
    return await fetch(`https://${serverDomain}:${port}/equipmentList`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

export async function fetchWorkingEquipments() {
    return await fetch(`https://${serverDomain}:${port}/workingEquipmentList`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

export async function getResearches() {
    return await fetch(`https://${serverDomain}:${port}/researches`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

export async function updateReagentApplication(personData, applicationData) {
    return await fetch(`https://${serverDomain}:${port}/updateReagentApplications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            personData, applicationData
        })
    }).then(res => res.json())
}

export async function fetchOperatingEquipments() {
    return await fetch(`https://${serverDomain}:${port}/workingEquipmentList`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json()).then(data => consol.log(data))
}

export async function getReagentApplications(chatID) {
    return await fetch(`https://${serverDomain}:${port}/reagentApplications`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

export async function deleteReagentApplication(chatID, applicationID) {
    return await fetch(`https://${serverDomain}:${port}/deleteReagentApplication`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatID, applicationID
        })
    }).then(res => res.json())
}