import React, { Component } from 'react';

import AuthService from '../services/AuthService';

class AdminComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            adminSpell: ''
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.beAdmin = this.beAdmin.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]
                  :event.target.value
        });
    }

    beAdmin = (e) => {
        e.preventDefault();
        let adminRequest = {
            username: localStorage.getItem("username"),
            refreshToken: localStorage.getItem("refreshToken"),
            adminSpell: this.state.adminSpell
        }

        console.log(adminRequest);

        AuthService.beAdmin(adminRequest).then(res => {
            if (res.status === 200) {
                localStorage.setItem("authenticationToken", res.data.authenticationToken);
                localStorage.setItem('expiresAt', res.data.expiresAt);
                console.log("Access token refreshed with New Role!");
            }
            console.log("You are now Admin!");
            this.props.history.push('/home');
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    isAdmin() {
        let role = AuthService.getUserRole();
        if (role && role[0] === "ROLE_ADMIN")
            return true;
        
        return false;
    }

    render() {
        return (
            <div>
                { !this.isAdmin() &&
                <div>
                    <h3>Are you Admin ?</h3>
                    <form>
                        <span>
                            <input type="text" id="adminSpell" className="form-control" name="adminSpell" value={this.state.adminSpell} onChange={this.changeHandler} required />
                            <button className="btn btn-success" onClick={this.beAdmin}>Post</button>
                        </span>
                    </form>
                </div>
                 }
                 {
                     this.isAdmin() &&
                     <div>
                         <h3>Hi admin</h3>
                     </div>
                 }
            </div>
        );
    }
}

export default AdminComponent;