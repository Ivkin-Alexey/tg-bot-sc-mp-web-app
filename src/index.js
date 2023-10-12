import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {Provider} from "react-redux";
import rootReducer from './redux/rootReducer';
import thunk from "redux-thunk"
import {applyMiddleware, compose, legacy_createStore as createStore} from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

let persistor = persistStore(store);
export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
        <BrowserRouter><React.StrictMode><CssBaseline>
            <App/>
        </CssBaseline></React.StrictMode></BrowserRouter>
    </Provider>
    </PersistGate>
);


