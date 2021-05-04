import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/posts";

class PostService {
    getAllPosts() {
        return axios.get(BASE_URL);
    }

}

export default new PostService();