import React, { Component } from 'react';
import VoteButtonComponent from './VoteButtonComponent';
import SideBarComponent from './SideBarComponent';
import SubredditSideBarComponent from './SubredditSideBarComponent';

import PostService from '../services/PostService';
import CommentService from '../services/CommentService';

import { Link } from 'react-router-dom';

import '../css/PostViewComponent.css';

class PostViewComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            post: {},
            comments: [],
            text: ''
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.createComment = this.createComment.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        PostService.getPost(this.state.id).then((res) => {
            this.setState({post: res.data});
        });

        CommentService.getAllCommentsForPost(this.state.id).then((res) => {
            this.setState({comments: res.data});
        });
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]
                  :event.target.value
        });
    }

    createComment = (e) => {
        e.preventDefault();
        let comment = {
            postId: this.state.id,
            text: this.state.text
        }

        console.log("inputs : " + JSON.stringify(comment));

        CommentService.createComment(comment).then(res => {

            CommentService.getAllCommentsForPost(this.state.id).then((res) => {
                this.setState({comments: res.data});
            });
        });
    }

    deletePost(id) {
            if (confirm("Are you sure?")) {
            PostService.deletePost(id).then((res) => {
                this.props.history.push('/');
            });
        }
    }

    getUsername() {
        if (this.state.post.userName) {
            return <Link to={"/home"} className="username">{this.state.post.userName}</Link>
        } else {
            return <Link to={"/home"} className="username">Anonymous</Link>
        }
    }

    isOwner() {
        if (this.state.post.userName === localStorage.getItem("username")) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                <div className="container">
                <div className="row">
                    <hr />
                    <div className="col-md-9">
                        <div className="row post" key={this.state.post.id}>
                            <div className="col-md-1">
                                <VoteButtonComponent post={this.state.post}/>
                            </div>
                            <div className="col-md-11">
                                <span className="subreddit-info">
                                    <span className="subreddit-text">
                                        <Link to="/home" className="post-url">{this.state.post.subredditName}</Link>
                                    </span>
                                    <span>
                                    . Posted
                                        <span> . {this.state.post.duration} </span>
                                        by {this.getUsername()}
                                    </span>
                                    {
                                        this.isOwner() && <button className="btn btn-danger float-right" onClick={() => this.deletePost(this.state.post.id)}>DELETE</button>
                                    }
                                </span>
                                <hr />
                                <div className="post-title">
                                    <a className="post-title" href={this.state.post.url}>{this.state.post.postName}</a>
                                </div>
                                <div>
                                    <p className="post-text">{this.state.post.description}</p>
                                </div>

                                <div className="post-comment">
                                    <form>
                                    <div className="form-group">
                                        <textarea name="text" value={this.state.text} onChange={this.changeHandler} className="form-control" placeholder="Your Thoughts?"></textarea>
                                    </div>
                                    <button type="submit" onClick={this.createComment} className="login float-right">Comment</button>
                                    </form>
                                    </div>
                                    <div style={{marginTop: "60px"}}>
                                        {
                                            this.state.comments.map(
                                                (comment) => (
                                            <div className="comment" key={comment.id}>
                                            <div className="username">
                                                <Link to={"/user-profile/" + comment.userName}>{comment.userName}</Link>
                                            </div>
                                            <div>
                                                <p>{comment.duration}</p>
                                            </div>
                                            <b>{comment.text}</b>
                                            </div>
                                            )
                                        )}
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <SideBarComponent/>
                            <SubredditSideBarComponent/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostViewComponent;