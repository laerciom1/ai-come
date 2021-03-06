import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';


import Home from './pages/home/Home.js';
import Login from './pages/login/Login.js'
import Index from './pages/index/Index.js'
import Register from './pages/register/Register.js'
import Store from './pages/store/Store.js'
import OrdersList from './pages/ordersList/OrdersList.js';
import AddressRegister from './pages/addressRegister/AddressRegister.js';
import AddressesList from './pages/addressesList/AddressesList.js';

const history = createBrowserHistory()

class PrivateRoute extends Component {
    estaAutenticado() {
        if(localStorage.getItem('access_token')){
            return true
        }
        return false
    }

    render() {
        if(this.estaAutenticado()) {
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
            <Route path='/orders' component={OrdersList} />
            <Route path='/addressEdit' component={AddressRegister} />
            <Route path='/addresses' component={AddressesList} />
        </Switch>
    )
};

export default Routes;

export {history};