import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import '../css/SideBarComponent.css';

class SideBarComponent extends Component {

    constructor(props) {
        super(props);

        this.createPost = this.createPost.bind(this);
        this.createSubreddit = this.createSubreddit.bind(this);
    }

    createPost() {
        this.props.history.push('/create-post');
    }

    createSubreddit() {
        this.props.history.push('/create-subreddit');
    }
    render() {
        return (
            <div>
                <div className="sidebar">
                    <img src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png" alt='reddit-logo'/>
                    <div style={{textAlign: "center", fontSize: "1em"}}>
                        Welcome to Spring Reddit Clone home page.
                        Come here to check in with your favorite subreddits.
                    </div>
                    <div style={{textAlign: "center"}}>
                        <button className="btnCreatePost" onClick={this.createPost}>Create Post</button>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <button className="btnCreateSubreddit" onClick={this.createSubreddit}>Create Subreddit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SideBarComponent);