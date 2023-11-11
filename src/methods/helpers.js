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