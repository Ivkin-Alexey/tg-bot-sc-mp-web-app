import {api} from "./api"
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {IPerson} from "../../types/interfaces";

export const personsApi = api.injectEndpoints({
    endpoints: builder => ({

        createPerson: builder.mutation<null, IPerson>({
            query: person => ({
                    body: person,
                    url: "createPerson",
                    method: "POST"
            })
        })
    })
})