import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
// import authReducer from './features/authSlice'

//persit our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import employeeReducer from "./features/employeeSlice";

//reducers
const reducer = combineReducers({
    employee: employeeReducer,
    [api.reducerPath]: api.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: [api.reducerPath],
};

// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, api.middleware],
});

export default store;