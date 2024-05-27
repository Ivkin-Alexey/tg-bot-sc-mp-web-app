import {api} from "./api"
import {IResearch} from "../../models/researches";

export const researchsApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllresearcheas: builder.query<IResearch[], void>( {
            query: () => "/researches",
        }),
    })
})

export const {useFetchAllresearcheasQuery} = researchsApi