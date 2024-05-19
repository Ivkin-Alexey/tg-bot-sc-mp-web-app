import {api} from "./api"
import {IEquipmentListByCategories} from "../../types/interfaces";

export const equipmentsApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllEquipments: builder.query<IEquipmentListByCategories, void>( {
            query: () => "/equipments",
        }),
        fetchWorkingEquipments: builder.query<IEquipmentListByCategories, void>( {
            query: () => "/workingEquipments",
        }),
        startUsingEquipment: builder.mutation<null, {chatID: string, equipmentID: string}>({
            query: data => ({
                    body: data,
                    url: "/equipmentStart",
                    method: "PUT"
            })
        }),
        endUsingEquipment: builder.mutation<null, {chatID: string, equipmentID: string}>({
            query: data => ({
                    body: data,
                    url: "/equipmentEnd",
                    method: "PUT"
            })
        })
    })
})

export const {useFetchAllEquipmentsQuery} = equipmentsApi