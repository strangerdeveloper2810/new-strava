import { all } from "redux-saga/effects";
import * as getToken from "./getTokenStravaSaga";

export function* rootSaga() {
    yield all([
        getToken.actionGetTokenStrava()
    ])
}