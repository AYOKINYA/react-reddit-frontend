import React from "react"
import { Route, Redirect } from "react-router-dom"

const AuthRoute = ({ component: Component, ...rest }) => {

    let auth = (localStorage.getItem("refreshToken") != null);

    return (
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}

export default AuthRoute;