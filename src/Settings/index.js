import axios from "axios";

const DOMAIN = "https://www.strava.com/api/v3";
export const DOMAIN_FETCH_TOKEN = "https://www.strava.com";
export const ACCESS_TOKEN = "accessToken";

export const clientId = '127128';
export const clientSecret = 'b6097f741c5e7156764b8350179145222fa1cfa4';
export const scope = 'read,activity:read_all';
export const redirectUri = 'https://strava-api-dun.vercel.app/';
export const sheetDbUrlRegistration = 'https://sheetdb.io/api/v1/6q0812gcbeszf';
export const sheetDbUrlActivities = 'https://sheetdb.io/api/v1/2iethxwsa7ic3';
export const sheetDbUrlChallenge = 'https://sheetdb.io/api/v1/ge9q0s695kxj2';

export const settings = {
    setStorageJson: (name, data) => {
        data = JSON.stringify(data);
        localStorage.setItem(name, data);
    },
    setStorage: (name, data) => {
        localStorage.setItem(name, data);
    },
    getStorageJson: (name) => {
        if (localStorage.getItem(name)) {
            const dataStore = localStorage.getItem(name);
            if (typeof dataStore == "string") {
                const data = JSON.parse(dataStore);
                return data;
            }
            return undefined;
        }
        return; //undefined
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            const data = localStorage.getItem(name);
            return data;
        }
        return; //undefined
    },

    clearStorage: (name) => {
        localStorage.removeItem(name);
    },
};

export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 20000,
});

export const httpFetchToken = axios.create({
    baseURL: DOMAIN_FETCH_TOKEN,
    timeout: 20000,
})

http.interceptors.request.use(
    (config) => {
        //Cấu hình tất cả header gửi đi đều có bearer token (token authorization đăng nhập)
        config.headers = {
            ...config.headers,
            Authorization: "Bearer " + settings.getStore(ACCESS_TOKEN),
        };

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

http.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    (error) => {
        //Hàm cấu hình cho tất cả lỗi nhận về
        if (error.response?.status === 400 || error.response?.status === 404) {
            //Chuyển hướng trang về trang chủ
            return;
        }

        if (error.response?.status === 401 || error.response?.status === 403) {
            alert("Không đủ quyền")
        }

        return Promise.reject(error);
    }
);

httpFetchToken.interceptors.request.use(
    (config) => {
        //Cấu hình tất cả header gửi đi đều có bearer token (token authorization đăng nhập)
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

httpFetchToken.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    (error) => {
        //Hàm cấu hình cho tất cả lỗi nhận về
        if (error.response?.status === 400 || error.response?.status === 404) {
            //Chuyển hướng trang về trang chủ
            return;
        }

        if (error.response?.status === 401 || error.response?.status === 403) {
            alert("Không đủ quyền")
        }

        return Promise.reject(error);
    }
);