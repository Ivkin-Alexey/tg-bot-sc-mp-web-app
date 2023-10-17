import constants from "../assets/constants/constants";

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
        await fetch(`https://${serverDomain}:${port}/deleteUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatID
            })
        })
    } catch (e) {
        console.log(e);
    }
}

