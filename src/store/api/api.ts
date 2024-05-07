import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query";
import constants from "../../assets/constants/constants.js"
import {IPerson} from "../../types/interfaces.tsx";

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["Persons"],
    baseQuery: fetchBaseQuery({
        baseUrl: constants.serverDomain
    }),
    endpoints: build => ({
        fetchPersons: build.query<IPerson[], null>( {
            query: () => "/persons",
            providesTags: (result, error, id) => [
                {type: "Persons", id}
            ]
        }),
        createPerson: build.mutation<null, IPerson>({
            query: person => ({
                body: person,
                url: "createPerson",
                method: "POST"
            })
        })
    }),
})

export const {usePersonsQuery} = api