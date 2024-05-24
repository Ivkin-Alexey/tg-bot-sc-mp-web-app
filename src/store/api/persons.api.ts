import {api} from "./api"
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {IPerson, IUpdatedPersonData} from "../../models/interfaces";

export const personsApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllPersons: builder.query<IPerson[], void>( {
            query: () => "/persons",
        }),
        fetchPerson: builder.query<IPerson, void>( {
            query: (chatID) => "/persons" + chatID,
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

export const {useCreatePersonMutation, useFetchAllPersonsQuery, useFetchPersonQuery} = personsApi;