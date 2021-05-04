import React, { Component } from 'react';

import '../css/SideBarComponent.css';

class SideBarComponent extends Component {
    render() {
        return (
            <div>
                <div className="sidebar">
                    <img src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png" />
                    <div style={{textAlign: "center", fontSize: "1em"}}>
                        Welcome to Spring Reddit Clone home page.
                        Come here to check in with your favorite subreddits.
                    </div>
                    <div style={{textAlign: "center"}}>
                        <button className="btnCreatePost">Create Post</button>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <button className="btnCreateSubreddit">Create Subreddit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBarComponent;