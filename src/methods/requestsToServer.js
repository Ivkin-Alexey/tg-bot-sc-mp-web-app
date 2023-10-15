import React, {useEffect, useState} from 'react';
import constants from "../assets/constants/constants";
const {serverDomain, port} = constants;

export async function getUsers() {
    let users = null;
    try {
        fetch(`https://${serverDomain}:${port}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },}
        )
            .then(res => res.json())
            .then(data => users = data);
    } catch (e) {
        console.log(e);
    }
    return users;
}


