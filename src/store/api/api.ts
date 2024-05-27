import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import constants from "../../assets/constants/constants.js"
import {IPerson} from "../../models/persons.js";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: constants.serverDomain
    }),
    refetchOnFocus: true,
    endpoints: () => ({})
})