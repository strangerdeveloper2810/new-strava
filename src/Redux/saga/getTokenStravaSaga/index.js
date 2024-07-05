import { put, call, takeLatest } from "redux-saga/effects";
import { FETCH_API_GET_TOKEN_STRAVA } from '../../types/index';
import { clientId, clientSecret, httpFetchToken, redirectUri, scope } from "../../../Settings";

export function* getTokenStrava() {
    try {
        const stravaAuthorizeUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;

        window.location.href = stravaAuthorizeUrl;

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const params = {
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri
            };
            const response = yield call(() => {
                return httpFetchToken.post("/oauth/token", null, { params })
            });

            console.log({ response });
        }
    } catch (error) {
        console.log(error);
    }
}


export function* actionGetTokenStrava() {
    yield takeLatest(FETCH_API_GET_TOKEN_STRAVA, getTokenStrava)
}