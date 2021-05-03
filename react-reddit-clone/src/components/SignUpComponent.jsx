import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

class SignUpComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            userName: '',
            password:'',
            signUpSucess: false
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]
                  :event.target.value
        });
    }

    signUp = (e) => {
        e.preventDefault();
        let signUpInfo = {
            email: this.state.emailId,
            username: this.state.userName,
            password: this.state.password
        }

        console.log("inputs : " + JSON.stringify(signUpInfo));

        AuthService.signUp(signUpInfo).then(res => {
            // this.props.history.push('/');
            this.setState({signUpSucess:true});
        })

    }


    render() {
        return (
            <div>
                <div className="register-section">
                    <div className="row justify-content-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                    
                    <div className="card">
                        <div className="card-header" style={{textAlign: "center"}}>
                            <h4>Register</h4>
                        </div>
                        {this.state.showSuccessMessage && <div>Signup Sucessful</div>}
                        <div className="card-body">
                            <form>
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div className="col-md-6">
                                    <input type="text" id="email_address" className="form-control" name="emailId" value={this.state.emailId} onChange={this.changeHandler} required autoFocus>  
                                    </input>
                                </div>    
                            </div>

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
                                <button type="submit" className="sign-up" onClick={this.signUp}>
                                    Sign Up
                                </button>
                                <span style={{paddingLeft: "15px"}}>Existing user? <Link to="/login">Log In</Link></span>
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

export default SignUpComponent;