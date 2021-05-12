import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/auth";

class AuthService {
    signUp(signUpInfo) {
        return axios.post(BASE_URL + "/signup", signUpInfo);
    }

    login(loginInfo) {
        return axios.post(BASE_URL + "/login", loginInfo);
    }

    logout(logoutInfo) {
        return axios.post(BASE_URL + "/logout", logoutInfo);
    }

    beAdmin(adminRequest) {
        return axios.post(BASE_URL + "/admin", adminRequest);
    }

    getUserRole() {
        let token = localStorage.getItem("authenticationToken");
        return JSON.parse(atob(token.split('.')[1])).scopes
    }
}

axios.interceptors.request.use(
    request => {
        if ( 
            request.url.includes('refresh') || 
            request.url.includes('login') ||
            (request.url.includes('/api/posts') &&  request.method.includes('get')) ||
            (request.url.includes('/api/subreddit') && request.method.includes('get')) ||
            (request.url.includes('/api/comments') && request.method.includes('get'))
        ) {
            return request;
        }

        const token = localStorage.getItem('authenticationToken');
        if (token) {
            request.headers['Authorization'] = 'Bearer ' + token;
        }
        return request;
    },
    error => {
        Promise.reject(error)
    });

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem("refreshToken");
        let username = localStorage.getItem("username");
        localStorage.removeItem('authenticationToken'); // to avoid jwt validation filter
    if (
        refreshToken && error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
        ) {
        originalRequest._retry = true;
        return axios
            .post(BASE_URL + "/refresh/token", { refreshToken: refreshToken, username: username })
            .then((res) => {
            if (res.status === 200) {
                console.log(res);
                localStorage.setItem("authenticationToken", res.data.authenticationToken);
                localStorage.setItem('expiresAt', res.data.expiresAt);
                console.log("Access token refreshed!");
                return axios(originalRequest);
            }
            });
        }
        return Promise.reject(error);
    }
    );

export default new AuthService();