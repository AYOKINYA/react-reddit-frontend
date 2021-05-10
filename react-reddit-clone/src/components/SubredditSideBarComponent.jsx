import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import SubredditService from '../services/SubredditService';

import '../css/SubredditSideBarComponent.css';

class SubredditSideBarComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subreddits: [],
            displayViewAll: false
        }
    }

    componentDidMount() {
        SubredditService.getAllSubreddits().then((res) => {
            if (res.data.length >= 4) {
                this.setState({subreddits: res.data.splice(0, 3)});
                this.setState({displayViewAll: true});
            } else {
                this.setState({subreddits: res.data});
            }
            
        });
    }

    render() {
        return (
            <div>
                <div className="sidebar-view-subreddit">
                    <div style={{color: "black", fontWeight: "bold"}}>Browse Subreddits</div>
                    <hr />
                    {this.state.subreddits.map(
                        (subreddit) => (
                            <div className="subreddit-text" key={subreddit.id}>
                                <Link to={"/view-subreddit/" + subreddit.id} >{subreddit.name}</Link>
                            <hr />
                            </div>
                        ))
                    }
                    { this.state.displayViewAll &&
                    <div style={{textAlign: "center"}}>
                        <Link to="/subreddits-list" style={{fontWeight: "bold"}} >View All</Link>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default SubredditSideBarComponent;