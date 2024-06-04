import {api} from "./api"
import {IEquipmentListByCategories, IOperatingEquipment} from "../../models/equipments";
import { TChatID, TEquipmentID } from "../../models/main";

type ApiSliceEndpoints = typeof api.endpoints;

export const equipmentsApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllEquipments: builder.query<string, void>( {
            query: () => "/equipments",
        }),
        fetchAllOperatingEquipments: builder.query<IEquipmentListByCategories, null>( {
            query: () => "/operatingEquipments",
        }),
        fetchOperatingEquipmentsByCategory: builder.query<IOperatingEquipment[], string>( {
            query: (category) => `/operatingEquipments?category=${category}`,
        }),
        startUsingEquipment: builder.mutation<void, {chatID: TChatID, equipmentID: TEquipmentID}>({
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
        endUsingEquipment: builder.mutation<null, {chatID: TChatID, equipmentID: TEquipmentID}>({
            query: data => ({
                    body: data,
                    url: "/equipmentEnd",
                    method: "DELETE"
            })
        })
    })
})

export const {useFetchAllEquipmentsQuery, useFetchAllOperatingEquipmentsQuery, useFetchOperatingEquipmentsByCategoryQuery, useStartUsingEquipmentMutation, useEndUsingEquipmentMutation} = equipmentsApi