import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/auth";

class AuthService {

    signUp(signUpInfo) {
        return axios.post(BASE_URL + "/signup", signUpInfo);
    }

}

export default new AuthService();