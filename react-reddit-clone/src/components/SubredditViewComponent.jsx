import React, { Component } from 'react';
import PostService from '../services/PostService';
import SubredditService from '../services/SubredditService';

import PostTileComponent from './PostTileComponent';
import SideBarComponent from './SideBarComponent';
import SubredditSideBarComponent from './SubredditSideBarComponent';

class SubredditViewComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
        
            id: this.props.match.params.id,
            posts: [],
            subreddit: {}

        }
    }

    componentDidMount() {
        PostService.getAllPostsBySubreddit(this.state.id).then((res) => {
            this.setState({
                posts: res.data,
            });

            SubredditService.getSubreddit(this.state.id).then((res) =>{
                this.setState({subreddit: res.data});
            });
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                <div className="row">
                    <hr />
                    <div className="col-md-9">
                        <h3>Subreddit : {this.state.subreddit.name}</h3>
                        <span>{this.state.subreddit.description}</span>
                        <PostTileComponent posts={this.state.posts}/>
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

export default SubredditViewComponent;