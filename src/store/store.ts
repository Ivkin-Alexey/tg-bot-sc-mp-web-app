import {configureStore} from '@reduxjs/toolkit'
import rootReducer from "./reducers/rootReducer";
import { api } from './api/api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch