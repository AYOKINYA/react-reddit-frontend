import React, { Component } from 'react';

import PostService from '../services/PostService';
import PostTileComponent from './PostTileComponent';
import SideBarComponent from './SideBarComponent';
import SubredditSideBarComponent from './SubredditSideBarComponent';

class HomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }

        this.changeHandler = this.changeHandler.bind(this);

    }

    componentDidMount() {
        PostService.getAllPosts().then((res) => {
            this.setState({posts: res.data});
        });
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]
                  :event.target.value
        });
    }

    render() {
        return (
            
            <div>
                <div className="reddit-body">
                    <div className="container">
                        <div className="row">
                            <hr/>
                            <div className="col-md-9">
                                <PostTileComponent posts={this.state.posts}/>
                            </div>
                            <div className="col-md-3">
                                <SideBarComponent/>
                                <SubredditSideBarComponent/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeComponent;