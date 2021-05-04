import React, { Component } from 'react';

import '../css/CreateSubredditComponent.css';
import SubredditService from '../services/SubredditService';


class CreateSubredditComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description:'',
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.createSubreddit = this.createSubreddit.bind(this);
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]
                  :event.target.value
        });
    }

    createSubreddit = (e) => {
        e.preventDefault();
        let subreddit = {
            name: this.state.title,
            description: this.state.description
        }

        console.log("inputs : " + JSON.stringify(subreddit));

        SubredditService.createSubreddit(subreddit).then(res => {
            console.log(res);
            this.props.history.push('/subreddits-list');
        });
    }

    render() {
        return (
            <div>
                 <div>
                <div className="container">
                    <div className="row">
                        <div className="create-subreddit-container">
                        <form className="post-form">
                            <div className="form-group">
                            <div className="create-subreddit-heading">Create Subreddit</div>
                            <hr />
                            <input type="text" name="title" value={this.state.title} onChange={this.changeHandler} className="form-control" style={{marginTop: "5px"}}
                                placeholder="Title"/>
                            <textarea type="text" name="description" value={this.state.description} onChange={this.changeHandler} style={{width: "100%", marginTop: "5px"}}
                                placeholder="Description"></textarea>
                            <div>
                                <div style={{marginTop: "5px"}} className="float-right">
                                <button className="btnDiscard">Discard</button>
                                <button className="btnCreateSubreddit" onClick={this.createSubreddit}>Create</button>
                                </div>
                            </div>
                            </div>
                        </form>
                        </div>
                        <div className="col-md-3">
                        <div className="sidebar">
                            <h5 className="guidelines">Posting to Spring Reddit</h5>
                            <hr />
                            <ul>
                            <li>Remember the human</li>
                            <hr />
                            <li>Behave like you would in real life</li>
                            <hr />
                            <li>Don't spam</li>
                            <hr />
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
            
            </div>
        );
    }
}

export default CreateSubredditComponent;