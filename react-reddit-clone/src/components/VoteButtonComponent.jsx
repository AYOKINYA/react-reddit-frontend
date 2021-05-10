import React, { Component } from 'react';

import '../css/VoteButtonComponent.css';
import PostService from '../services/PostService';
import VoteService from '../services/VoteService';

import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class VoteButtonComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: (localStorage.getItem("refreshToken") != null),
            post: this.props.post,
            voteColor: ''
        }

        this.vote = this.vote.bind(this);
    }
    
    vote(votetype){

        if (votetype !== "UPVOTE" && votetype !== "DOWNVOTE")
        {
            alert("What kind of vote is this?");
            return ;
        }

        let vote = {
            postId: this.state.post.id,
            voteType: votetype
        }

        console.log("inputs : " + JSON.stringify(vote));

        VoteService.Vote(vote).then(res => {
            this.updateVoteStatus();
        });
    }

    updateVoteStatus() {
        PostService.getPost(this.state.post.id).then(res => {
            this.setState({post: res.data});
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column votebox">
                    {this.state.isLoggedIn &&
                        <div className="p-2">
                            <FontAwesomeIcon icon={faArrowUp} className="upvote" onClick={() => this.vote("UPVOTE")}
                            style={this.state.post.upVote ? {color: "green"} : {}}>Upvote</FontAwesomeIcon>
                        </div>
                    }
                    <div className="p-2 votecount">{this.state.post.voteCount}</div>
                    {this.state.isLoggedIn &&
                        <div className="p-2">
                            <FontAwesomeIcon icon={faArrowDown} className="downvote" onClick={() => this.vote("DOWNVOTE")}
                            style={this.state.post.downVote ? {color: "red"} : {}}>Downvote</FontAwesomeIcon>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default VoteButtonComponent;