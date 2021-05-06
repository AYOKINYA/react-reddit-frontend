import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/comments";

class CommentService {
    getAllCommentsForPost(postId) {
        return axios.get(BASE_URL + '/by-post/' + postId);
    }

    createComment(comment) {
        return axios.post(BASE_URL, comment);
    }

    getAllCommentsByUser(username) {
        return axios.get(BASE_URL + '/by-user/' + username);
    }

}

export default new CommentService();