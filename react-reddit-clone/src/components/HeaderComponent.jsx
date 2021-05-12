import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../services/AuthService';
import '../css/HeaderComponent.css';

import {Dropdown} from 'react-bootstrap';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

            isLoggedIn: (localStorage.getItem("refreshToken") != null),
            username: localStorage.getItem("username")

        }
        this.logout = this.logout.bind(this);
        this.goToUserProfile = this.goToUserProfile.bind(this);

    }

    logout() {
        let logoutInfo = {
            username: localStorage.getItem('username'),
            refreshToken: localStorage.getItem('refreshToken')
        }

        console.log("inputs : " + JSON.stringify(logoutInfo));

        AuthService.logout(logoutInfo).then(res => {

            localStorage.removeItem('authenticationToken');
            localStorage.removeItem('username');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('expiresAt');

            this.props.history.push('/');
        });
    }

    goToUserProfile(username) {
        this.props.history.push(`/user-profile/${username}`);
    }

    CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          <img className="account-icon" src="https://www.redditstatic.com/avatars/avatar_default_08_D4E815.png" alt="account icon"></img>
          {children}
        </a>
      ));
      

    render() {
        return (
            <div>
                <header>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <div className="flex-grow-1">
                        <Link to="/" aria-label="Home" className="logo" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="reddit-icon-svg">
                            <g>
                                <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
                                <path fill="#FFF"
                                d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z">
                                </path>
                            </g>
                            </svg>
                            <span className="reddit-text">
                                Spring Reddit Clone
                            </span>
                        </Link>
                    </div>

                    {this.state.isLoggedIn &&
                    <div className="flex-grow-1 float-right">

                    <Dropdown>
                        <Dropdown.Toggle as={this.CustomToggle} id="dropdown-custom-components"  className="userdetails">
                        {this.state.username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item eventKey="profile" onSelect={() => this.goToUserProfile(this.state.username)}>Profile</Dropdown.Item>
                        <Dropdown.Item eventKey="logout" onSelect={this.logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    
                    }
                   
                    { !(this.state.isLoggedIn) &&
                    <div className="flex-grow-1 float-right">
                        <Link to="/signup" className="float-right signup mr-2">Sign up</Link>
                        <Link to="/login" className="float-right login mr-2">Login</Link>
                    </div>
                    }

                </nav>
                </header>
                
            </div>
        );
    }
}

export default withRouter(HeaderComponent);