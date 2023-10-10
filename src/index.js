import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {Provider} from "react-redux";
import rootReducer from './redux/rootReducer';
import thunk from "redux-thunk"
import { legacy_createStore as createStore, applyMiddleware } from 'redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter><React.StrictMode><CssBaseline>
            <App/>
        </CssBaseline></React.StrictMode></BrowserRouter>
    </Provider>
);


