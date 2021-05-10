import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/subreddit";

class SubredditService {
    getAllSubreddits() {
        return axios.get(BASE_URL);
    }

    createSubreddit(subreddit) {
        return axios.post(BASE_URL, subreddit);
    }

    deleteSubreddit(id) {
        return axios.delete(BASE_URL + '/' + id);
    }

    editSubreddit(id, subreddit) {
        return axios.put(BASE_URL + '/' + id, subreddit);
    }

}

export default new SubredditService();