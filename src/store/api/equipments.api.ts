import {api} from "./api"
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {IPerson, IUpdatedPersonData} from "../../types/interfaces";

export const personsApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllEquipments: builder.query<IPerson[], void>( {
            query: () => "/persons",
        }),
        fetchWorkingEquipments: builder.query<IPerson, void>( {
            query: (chatID) => "/chatID=" + chatID,
        }),
        fetchAdmins: builder.query<IPerson[], void>( {
            query: () => "/admins",
        }),
        fetchEmployees: builder.query<IPerson[], void>( {
            query: () => "/employees",
        }),
        fetchUsers: builder.query<IPerson[], void>( {
            query: () => "/users",
        }),
        createPerson: builder.mutation<null, IPerson>({
            query: person => ({
                    body: person,
                    url: "/createPerson",
                    method: "POST"
            })
        }),
        deletePerson: builder.mutation<null, number>({
            query: chatID => ({
                    body: chatID,
                    url: "/deletePerson",
                    method: "DELETE"
            })
        }),
        updatePerson: builder.mutation<null, IUpdatedPersonData>({
            query: updatedData => ({
                    body: updatedData,
                    url: "/updatePerson",
                    method: "PUT"
            })
        })
    })
})

export const {useCreatePersonMutation, useFetchAllPersonsQuery} = personsApi