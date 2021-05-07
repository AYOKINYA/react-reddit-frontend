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
            post: this.props.post,
            voteType: ''
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
                    <div className="p-2">
                        <FontAwesomeIcon icon={faArrowUp} className="upvote" onClick={() => this.vote("UPVOTE")}>Upvote</FontAwesomeIcon>
                    </div>
                    <div className="p-2 votecount">{this.state.post.voteCount}</div>
                    <div className="p-2">
                        <FontAwesomeIcon icon={faArrowDown} className="downvote" onClick={() => this.vote("DOWNVOTE")}>Downvote</FontAwesomeIcon>
                    </div>
                </div>
            </div>
        );
    }
}

export default VoteButtonComponent;