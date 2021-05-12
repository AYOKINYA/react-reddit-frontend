import React, { Component } from 'react';

import PostService from '../services/PostService';
import PostTileComponent from './PostTileComponent';
import CommentService from '../services/CommentService';
import AuthService from '../services/AuthService';


import { Link } from 'react-router-dom';

class UserProfileComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {

            username: this.props.match.params.username,
            posts: [],
            postLength: 0,
            comments: [],
            commentLength: 0,
            role: []

        }

    }

    componentDidMount() {
        PostService.getAllPostsByUser(this.state.username).then((res) => {
            this.setState({
                posts: res.data,
                postLength: res.data.length
            });
        });

        CommentService.getAllCommentsByUser(this.state.username).then((res) => {
            this.setState({
                comments: res.data,
                commentLength: res.data.length
            });
        });

        this.setState({
            role: AuthService.getUserRole()
    })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div>
                        Your Role : {this.state.role[0]} <br />
                        Welcome <b>{this.state.username}</b>.<br /> You have posted <b>{this.state.postLength}</b> time(s) and commented
                        <b>{this.state.commentLength}</b> time(s).
                        You can check your post and comment history below.
                    </div>
                    <hr />
                    <div>
                        Your Posts:
                    </div>
                    <PostTileComponent posts={this.state.posts}/>
                    <hr />
                    <div>
                        Your Comments:
                    </div>
                    {this.state.comments.map((comment) =>(
                        <div className="comment" key={comment.id}>
                        <div className="username">
                            <Link to={"/user-profile/" + comment.username}>{comment.userName}</Link>
                        </div>
                        <div>
                            <p>{comment.duration}</p>
                        </div>
                        <b>{comment.text}</b>
                        </div>
                    ))
                    }
                        <hr />
                    </div>
            </div>
        );
    }
}

export default UserProfileComponent;