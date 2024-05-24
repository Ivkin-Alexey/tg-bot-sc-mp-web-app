import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "@reduxjs/toolkit";
import {actions as personsActions} from "../store/reducers/personsSlice"
import {actions as reagentsActions} from "../store/reducers/reagentsSlice"
import {actions as researchesActions} from "../store/reducers/researchesSlice"
import {actions as equipmentsActions} from "../store/reducers/equipmentsSlice"
import { useAppDispatch } from "./redux";

const rootActions = {
    ...personsActions,
    ...reagentsActions,
    ...equipmentsActions,
    ...researchesActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        bindActionCreators(rootActions, dispatch)
    }, [dispatch])
}

const {} = useActions()
