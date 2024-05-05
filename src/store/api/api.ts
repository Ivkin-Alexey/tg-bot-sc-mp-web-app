import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query";
import constants from "../../assets/constants/constants.js"
import {IPerson} from "../../types/interfaces.tsx";

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["person"],
    baseQuery: fetchBaseQuery({
        baseUrl: constants.serverDomain
    }),
    endpoints: builder => ({
        fetchPersons: builder.query<IPerson[], void>( {
            query: (): IPerson[] => "/persons",
            invalidatesTags: () => [
                {type: "Person"}
            ]
        }),
        createPerson: builder.mutation<null, IPerson>({
            query: person => ({
                body: person,
                url: "createPerson",
                method: "POST"
            })
        })
    }),
})