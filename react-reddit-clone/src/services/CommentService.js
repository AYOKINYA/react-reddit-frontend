import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/comments";

class CommentService {
    getAllCommentsForPost(postId) {
        return axios.get(BASE_URL + '/by-post/' + postId);
    }

    createComment(comment) {
        return axios.post(BASE_URL, comment);
    }

}

export default new CommentService();