import React, { Component } from 'react';

import '../css/CreatePostComponent.css';
import PostService from '../services/PostService';
import SubredditService from '../services/SubredditService';

class CreatePostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            subredditName: '',
            url: '',
            subreddits: []
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]
                  :event.target.value
        });
    }

    componentDidMount() {
        SubredditService.getAllSubreddits().then((res) => {
            this.setState({subreddits: res.data});
        });
    }

    createPost = (e) => {
        e.preventDefault();
        let post = {
            postName: this.state.title,
            description: this.state.description,
            subredditName: this.state.subredditName,
            url: this.state.url
        }

        console.log("inputs : " + JSON.stringify(post));

        PostService.createPost(post).then(res => {
            console.log(res);
        })

    }

    render() {
        return (
           <div>
               <div className="container">
                <div className="row">
                    <hr />
                    <div className="create-post-container col-md-9">
                    <form className="post-form" >
                        <div className="form-group">
                        <div className="create-post-heading">Create Post</div>
                        <hr />
                        <input type="text" name="title" value={this.state.title} onChange={this.changeHandler} className="form-control" style={{marginTop: "5px"}}placeholder="Title"/>
                        <input type="text" name="url" value={this.state.url} onChange={this.changeHandler} className="form-control"  style={{marginTop: "5px"}} placeholder="URL"/>

                        <select name="subredditName" value={this.state.subredditName} onChange={this.changeHandler} className="form-control" style={{marginTop: "10px"}}>
                            <option defaultValue="" disabled>Select Subreddit</option>
                            { this.state.subreddits.map(
                                (subreddit) => (
                                    <option key={subreddit.id}>{subreddit.name}</option>
                                ))
                            }
                        </select>

                        <textarea type="text" name="description" value={this.state.description} onChange={this.changeHandler} style={{width: "100%", marginTop: "5px"}}
                                placeholder="Description"></textarea>

                        <span>
                            <div style={{marginTop: "5px"}} className="float-right">
                            <button className="btnDiscard">Discard</button>
                            <button className="btnCreatePost" onClick={this.createPost}>Post</button>
                            </div>
                        </span>
                        </div>
                    </form>
                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
                </div>
           </div>
        );
    }
}

export default CreatePostComponent;