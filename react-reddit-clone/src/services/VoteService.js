import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/votes";


class VoteService {

    Vote(vote) {
        return axios.post(BASE_URL, vote);
    }

}

export default new VoteService();