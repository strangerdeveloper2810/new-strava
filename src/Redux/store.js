import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleWare from "redux-saga";
import GetTokenStrava from "./slice/GetTokenStrava";
import { rootSaga } from "./saga/rootSaga";

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
    reducer: {
        GetTokenStrava
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga)