import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

import '../css/LoginComponent.css';

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password:'',
            loginSucess: false
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.login = this.login.bind(this);
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]
                  :event.target.value
        });
    }

    login = (e) => {
        e.preventDefault();
        let loginInfo = {
            username: this.state.userName,
            password: this.state.password
        }

        console.log("inputs : " + JSON.stringify(loginInfo));

        AuthService.login(loginInfo).then(res => {
            console.log(res);
            localStorage.setItem('authenticationToken', res.data.authenticationToken);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('expiresAt', res.data.expiresAt);

            AuthService.insertToken();
        })

    }

    render() {
        return (
            <div>
                <div className="login-section">
                    <div className="row justify-content-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                    
                    <div className="card">
                        <div className="card-header" style={{textAlign: "center"}}>
                            <h4>Login</h4>
                        </div>
                        {this.state.loginSucess && <div>Login Sucessful</div>}
                        <div className="card-body">
                            <form>
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">User Name</label>
                                <div className="col-md-6">
                                    <input type="text" className="form-control" name="userName" value={this.state.userName} onChange={this.changeHandler} required autoFocus />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Password</label>
                                <div className="col-md-6">
                                    <input type="password" id="password" className="form-control" name="password" value={this.state.password} onChange={this.changeHandler} required />
                                </div>
                            </div>

                            <span className="col-md-6 offset-md-4">
                                <button type="submit" className="login" onClick={this.login}>
                                    Login
                                </button>
                                <span style={{paddingLeft: "15px"}}>New To SpringReddit? <Link to="/signup">Sign Up</Link></span>
                            </span>

                            </form>
                        </div>
                    
                    </div>

                    </div>
                    <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;