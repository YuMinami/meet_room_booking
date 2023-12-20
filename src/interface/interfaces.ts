import axios, {AxiosRequestConfig} from "axios";
import {RegisterUser} from "../pages/register/Register";
import {UpdatePassword} from "../pages/update_password/UpdatePassword";
import {UserInfo} from "../pages/update_info/UpdateInfo";
import {message} from "antd";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3002/',
    timeout: 10000
})

axiosInstance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        config.headers.authorization = 'Bearer ' + accessToken;
    }
    return config;
});

interface PendingTask {
    config: AxiosRequestConfig
    resolve: Function
}

let refreshing = false;
const queue: PendingTask[] = [];

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (!error.response) {
            return Promise.reject(error);
        }

        let {data, config} = error.response;
        if (refreshing) {
            new Promise((resolve) => {
                console.log(resolve);
                queue.push({config, resolve})
            });

            return error.response;
        }

        if (data.code === 401 && !config.url.includes('/user/refresh')) {
            refreshing = true;
            const res = await refreshToken();
            refreshing = false;

            console.log('res:' + JSON.stringify(res))

            if (res.status === 200) {
                queue.forEach(({config, resolve}) => {
                        resolve(axiosInstance(config));
                    }
                )
                return axiosInstance(config);
            } else {
                message.error(res.data.data);
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            }
        } else {
            return error.response;
        }

    },
);

async function refreshToken() {
    console.log("refreshToken")
    const res = await axiosInstance.get('/user/refresh', {
        params: {
            refresh_token: localStorage.getItem('refresh_token')
        }
    });

    console.log("refreshToken res:" + res)

    localStorage.setItem('access_token', res.data.access_token || '');
    localStorage.setItem('refresh_token', res.data.refresh_token || '');
    return res;
}

export async function login(username: string, password: string) {

    return await axiosInstance.post("/user/login", {
        username, password
    });
}

export async function registerCaptcha( email: string) {
    return await axiosInstance.get("/user/register-captcha",{
        params:{
            address: email
        }
    });
}

export async function register(registerUser: RegisterUser) {
    return await axiosInstance.post("/user/register", registerUser);
}

export async function updatePasswordCaptcha(email: string) {
    return await axiosInstance.get('/user/update_password/captcha', {
        params: {
            address: email
        }
    });
}

export async function updatePassword(data: UpdatePassword) {
    return await axiosInstance.post('/user/update_password', data);
}

export async function getUserInfo() {
    return await axiosInstance.get('/user/info');
}

export async function updateInfo(data: UserInfo) {
    return await axiosInstance.post('/user/update', data);
}

export async function updateUserInfoCaptcha() {
    return await axiosInstance.get('/user/update/captcha');
}