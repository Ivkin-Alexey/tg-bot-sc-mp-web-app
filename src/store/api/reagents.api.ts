import {api} from "./api"
import {IReagentData, IUpdatedReagentData, TChatID} from "../../types/interfaces";

export const reagentsApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllreagentApps: builder.query<IReagentData[], void>( {
            query: () => "/reagentApps",
        }),
        createApp: builder.mutation<null, {chatID: TChatID, reagentData: IReagentData}>({
            query: data => ({
                    body: data,
                    url: "/createReagentApp",
                    method: "POST"
            })
        }),
        deleteApp: builder.mutation<null, {chatID: TChatID, appID: string}>({
            query: data => ({
                    body: data,
                    url: "/deleteReagentApp",
                    method: "DELETE"
            })
        }),
        updateApp: builder.mutation<null, {chatID: TChatID, updatedData: IUpdatedReagentData}>({
            query: data => ({
                    body: data,
                    url: "/updateReagentApp",
                    method: "PUT"
            })
        })
    })
})

export const {useFetchAllreagentAppsQuery} = reagentsApi