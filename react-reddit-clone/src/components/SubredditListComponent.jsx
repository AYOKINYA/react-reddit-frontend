import React, { Component } from 'react';
import SubredditService from '../services/SubredditService';

import { Link } from 'react-router-dom';
import SideBarComponent from './SideBarComponent';

class SubredditListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subreddits: [],
        }
    }

    componentDidMount() {
        SubredditService.getAllSubreddits().then((res) => {
            this.setState({subreddits: res.data});
        });
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <hr />
                        <div className="col-md-9">
                        <h2>List of Subreddits</h2>
                        <ul>
                        {
                            this.state.subreddits.map(
                                (subreddit) => (
                                    <li key={subreddit.id}>
                                        <Link to={"/view-subreddit/" + subreddit.id}>{subreddit.name}</Link>
                                    </li>
                                )
                            )
                        }
                        </ul>
                        </div>
                        <div className="col-md-3">
                            <SideBarComponent/>
                        </div>
                    </div>
                    </div>
            </div>
        );
    }
}

export default SubredditListComponent;