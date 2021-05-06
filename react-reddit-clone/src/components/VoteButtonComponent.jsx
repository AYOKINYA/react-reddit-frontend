import React, { Component } from 'react';

import '../css/VoteButtonComponent.css';
import PostService from '../services/PostService';
import VoteService from '../services/VoteService';

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

        if (votetype != "UPVOTE" && votetype != "DOWNVOTE")
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
            console.log(res);
            this.updateVoteStatus();
        });
    }

    updateVoteStatus() {
        PostService.getPost(this.state.post.id).then(res => {
            console.log(res);
            this.setState({post: res.data});
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column votebox">
                    <div className="p-2">
                        <button className="upvote" onClick={() => this.vote("UPVOTE")}>Upvote</button>
                    </div>
                    <div className="p-2 votecount">{this.state.post.voteCount}</div>
                    <div className="p-2">
                        <button className="downvote" onClick={() => this.vote("DOWNVOTE")}>Downvote</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default VoteButtonComponent;