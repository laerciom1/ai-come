import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/home/Home.js';
import Login from './pages/login/Login.js'
import Index from './pages/index/Index.js'
import Register from './pages/register/Register.js'
import Store from './pages/store/Store.js'

function estaAutenticado() {
    if(localStorage.getItem('USER_username')){
        return true
    }
    return false
}

class PrivateRoute extends Component {
    render() {
        if(estaAutenticado()) {
            return (
                <Route { ...this.props } />
            )
        } else {
            return (
                <Redirect to="/index"/>
            )
        }
    }
}

const Routes = () => {
    return (
        <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <Route path='/index' component={Index} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/store/:id' component={Store} />
        </Switch>
    )
}

export default Routes