import React, { Component } from 'react';
import VoteButtonComponent from './VoteButtonComponent';
import SideBarComponent from './SideBarComponent';
import SubredditSideBarComponent from './SubredditSideBarComponent';

import PostService from '../services/PostService';

import { Link } from 'react-router-dom';

import '../css/PostViewComponent.css';

class PostViewComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            post: {}
        }
    }

    componentDidMount() {
        PostService.getPost(this.state.id).then((res) => {
            this.setState({post: res.data});
        });
    }

    getUsername() {
        if (this.state.post.userName) {
            return <Link to={"/home"} className="username">{this.state.post.userName}</Link>
        } else {
            return <Link to={"/home"} className="username">Anonymous</Link>
        }
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
                                <VoteButtonComponent voteCount={this.state.post.voteCount}/>
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
                                </span>
                                <hr />
                                <div className="post-title">
                                    <a className="post-title" href={this.state.post.url}>{this.state.post.postName}</a>
                                </div>
                                <div>
                                    <p className="post-text">{this.state.post.description}</p>
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