import React, { Component } from 'react';

import '../css/VoteButtonComponent.css';

class VoteButtonComponent extends Component {
    render() {
        return (
            <div>
                <div className="d-flex flex-column votebox">
                    <div className="p-2">
                        <button className="upvote">Upvote</button>
                    </div>
                    <div className="p-2 votecount">{this.props.voteCount}</div>
                    <div className="p-2">
                        <button className="downvote">Downvote</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default VoteButtonComponent;