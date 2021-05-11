import React, { Component } from 'react';

import '../css/CreatePostComponent.css';
import PostService from '../services/PostService';
import SubredditService from '../services/SubredditService';

class EditPostComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            title: '',
            description: '',
            subredditName: '',
            url: '',
            subreddits: []
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.editPost = this.editPost.bind(this);
        this.discard = this.discard.bind(this);
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

        PostService.getPost(this.state.id).then((res) => {
            let post = res.data
            this.setState({
                title: post.postName,
                description: post.decription,
                subredditName: post.subredditName,
                url: post.url
            });
        });
    }

    editPost = (e) => {
        e.preventDefault();
        let id = this.state.id;
        let post = {
            postName: this.state.title,
            description: this.state.description,
            subredditName: this.state.subredditName,
            url: this.state.url
        }

        PostService.editPost(id, post).then(res => {
            this.props.history.push('/home');
        })

    }

    discard = (e) => {
        e.preventDefault();
        this.props.history.push('/home');
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
                        <div className="create-post-heading">Edit Post</div>
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
                            <button className="btnDiscard" onClick={this.discard}>Discard</button>
                            <button className="btnCreatePost" onClick={this.editPost}>Edit</button>
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
export default EditPostComponent;