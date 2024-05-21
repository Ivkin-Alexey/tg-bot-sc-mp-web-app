import {api} from "./api"
import {IEquipmentListByCategories} from "../../types/interfaces";

export const equipmentsApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllEquipments: builder.query<IEquipmentListByCategories, void>( {
            query: () => "/equipments",
        }),
        fetchOperatingEquipments: builder.query<IEquipmentListByCategories, void>( {
            query: () => "/operatingEquipments",
        }),
        startUsingEquipment: builder.mutation<null, {chatID: string, equipmentID: string}>({
            query: data => ({
                    body: data,
                    url: "/equipmentStart",
                    method: "POST"
            })
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