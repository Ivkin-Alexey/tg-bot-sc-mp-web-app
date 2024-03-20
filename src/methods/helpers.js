export function createUserName(user) {
    const {firstName, lastName, patronymic} = user;
    let name = "";
    if(lastName) {
        name+=lastName;
        if(firstName) name+= " " + firstName[0] + ".";
        if(patronymic) name+=patronymic[0] + ".";
    } else if (firstName) {
        name+=firstName;
        if(patronymic) name+= " " + patronymic;
    }
    return name;
}

export function createFullUserName(userData) {
    const {firstName, lastName, patronymic} = userData;
    return ((lastName ?? "") + ' ' + (firstName ?? "") + ' ' + (patronymic ?? "")).trim();
}
 
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

