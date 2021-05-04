import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/posts";

class PostService {
    getAllPosts() {
        return axios.get(BASE_URL);
    }
    createPost(post) {
        return axios.post(BASE_URL, post);
    }

    getPost(id) {
        return axios.get(BASE_URL + '/' + id);
    }

}

export default new PostService();