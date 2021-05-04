import React, { Component } from 'react';

import PostService from '../services/PostService';

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
                {
                    this.state.posts.map(
                        (post) => (
                            <div key={post.id}>
                            <li> {post.username} </li>
                            <li> {post.duration} </li>
                            <li> {post.description} </li>
                            </div>
                        )

                    )
                }
            </div>
        );
    }
}

export default HomeComponent;