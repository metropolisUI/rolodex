import React, {Component, PropTypes} from 'react'
import ReactDOM, {render, findDOMNode} from 'react-dom'
import { Router, Route, Link, History } from 'react-router'
import { createHistory, useBasename } from 'history'
import auth from './../auth'
import SplashPage from './components/SplashPage'
import Dashboard from './components/Dashboard'


require('./scss/main.scss');

const history = useBasename(createHistory)({
    basename: '/'
})

var App = React.createClass({
    getInitialState(){
        return{
            loggedIn: auth.loggedIn()
        }
    },

    updateAuth(loggedIn){
        this.setState({
            loggedIn: loggedIn
        })
    },

    componentWillMount(){
        auth.onChange = this.updateAuth
        auth.login()
    },

    render() {
        return (
            <div>
                <nav className="nav site-nav">
                    <div className="container">
                        <ul className="nav nav-pills navbar-left">
                            <li><a href="" className="logo">Rolodex.me</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">Documentation</a></li>
                        </ul>
                        <ul className="nav nav-pills navbar-right">
                            <li>{this.state.loggedIn ? (
                                <Link to="/logout">Log Out</Link>
                            ) : (
                                <Link to="/login">Sign In</Link>
                            )}
                            </li>
                            <li><Link to="/join">Join</Link></li>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </div>
        )
    }
})


var Login = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            error: false
        }
    },

    handleSubmit(event) {
        event.preventDefault()

        var email = findDOMNode(this.refs.email).value
        var pass = findDOMNode(this.refs.pass).value

        auth.login(email, pass, (loggedIn) => {
            if (!loggedIn)
                return this.setState({ error: true })

            var { location } = this.props

            if (location.state && location.state.nextPathname) {
                this.history.replaceState(null, location.state.nextPathname)
            } else {
                this.history.replaceState(null, '/about')
            }
        })
    },

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
                <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
                <button type="submit">login</button>
                {this.state.error && (
                    <p>Bad login information</p>
                )}
            </form>
        )
    }
});

var Logout = React.createClass({
    componentDidMount() {
        auth.logout()
    },

    render() {
        return <p>You are now logged out</p>
    }
});

function requireAuth(nextState, replaceState) {
    if (!auth.loggedIn())
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
}


const routes =
    <Route component={App}>
        <Route path="/" component={SplashPage}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="logout" component={Logout} />
        <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>;

ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('rolodex-app')
);