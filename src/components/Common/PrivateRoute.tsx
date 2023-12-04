import * as React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"

export function PrivateRoute(props: RouteProps) {
    //check if user logged in
    const isLoggedIn = Boolean(localStorage.getItem('access_token'))
    console.log('Is login =',isLoggedIn)
    if (!isLoggedIn)
    {
        return <Redirect to="/login" />
    }
    return <Route {...props} />
}   