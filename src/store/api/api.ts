import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import constants from "../../assets/constants/constants.js"
import {IPerson} from "../../types/interfaces";

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["person"],
    baseQuery: fetchBaseQuery({
        baseUrl: constants.serverDomain
    }),
    endpoints: builder => ({
        fetchPersons: builder.query<IPerson[], void>( {
            query: () => "/persons",

        }),
        createPerson: builder.mutation<null, IPerson>({
            query: (person: any) => ({
                body: person,
                url: "createPerson",
                method: "POST"
            })
        })
    }),
})