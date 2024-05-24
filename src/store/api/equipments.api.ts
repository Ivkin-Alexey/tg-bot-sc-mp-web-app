import {api} from "./api"
import {IEquipmentListByCategories, IOperatingEquipment} from "../../models/interfaces";

type ApiSliceEndpoints = typeof api.endpoints;

export const equipmentsApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllEquipments: builder.query<string, void>( {
            query: () => "/equipments",
        }),
        fetchOperatingEquipments: builder.query<IEquipmentListByCategories, void>( {
            query: () => "/operatingEquipments",
        }),
        startUsingEquipment: builder.mutation<void, {chatID: string, equipmentID: string}>({
            query: data => ({
                    body: data,
                    url: "/equipmentStart",
                    method: "POST"
            }),
            // async onQueryStarted(data, {dispatch, queryFulfilled}) {
            //     const patchResult = dispatch(api.util.updateQueryData("fetchAllEquipments", undefined, (draft: IOperatingEquipment[]) => {
            //         draft.push(data)
            //     }))
            //     try {
            //         await queryFulfilled
            //     } catch {
            //         patchResult.undo()
            //     }
            // }
        }),
        endUsingEquipment: builder.mutation<null, {chatID: string, equipmentID: string}>({
            query: data => ({
                    body: data,
                    url: "/equipmentEnd",
                    method: "DELETE"
            })
        })
    })
})

export const {useFetchAllEquipmentsQuery, useFetchOperatingEquipmentsQuery, useStartUsingEquipmentMutation, useEndUsingEquipmentMutation} = equipmentsApi