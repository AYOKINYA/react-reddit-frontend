import React, { Component } from 'react';

import { Link,  withRouter } from 'react-router-dom';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/PostTileComponent.css';
import VoteButtonComponent from './VoteButtonComponent';

class PostTileComponent extends Component {

    constructor(props) {
        super(props);
        
        this.viewPost = this.viewPost.bind(this);
    }


    viewPost(id) {
        this.props.history.push(`/view-post/${id}`);
    }

    render() {
        return (
            <div>
                {this.props.posts.map(
                    (post) => (
                <div className="row post" key={post.id}>
                    <div className="col-md-1">
                        <VoteButtonComponent post={post}/>
                    </div>

                    <div className="col-md-11">
                        <span className="subreddit-info">
                            <span className="subreddit-text">
                                <Link to="/home" className="posturl">{post.subredditName}</Link>
                            </span>
                            <span>
                                . Posted by <Link to={"/user-profile/" + post.userName}>{post.userName}</Link>
                            </span>
                            <span> . {post.duration} </span>
                        </span>
                        <hr />
                        <div className="post-title">
                            <a className="postname" href={post.url}>{post.postName}</a>
                        </div>
                        <div>
                            <p className="post-text">{post.description}</p>
                        </div>
                        <hr />
                        <span>
                            <FontAwesomeIcon icon={faComments} className="btnComments"></FontAwesomeIcon>Comments({post.commentCount})
                            <button className="login" onClick={() => this.viewPost(post.id)}>Read Post</button>
                        </span>
                    </div>
                </div>
                    )
                )
                }
                
            </div>
        );
    }
}

export default withRouter(PostTileComponent);