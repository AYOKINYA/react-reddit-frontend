import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/auth";

class AuthService {

    signUp(signUpInfo) {
        return axios.post(BASE_URL + "/signup", signUpInfo);
    }

    login(loginInfo) {
        return axios.post(BASE_URL + "/login", loginInfo);
    }

    insertToken() {
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('authenticationToken');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                // config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

}

export default new AuthService();