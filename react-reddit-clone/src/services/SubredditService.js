import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/subreddit";

class SubredditService {
    getAllSubreddits() {
        return axios.get(BASE_URL);
    }

}

export default new SubredditService();