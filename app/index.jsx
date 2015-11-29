import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import SplashPage from './components/SplashPage';
import Dashboard from './components/Dashboard';

require('./scss/main.scss');

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


const routes =
    <Route component={App}>
        <Route path="/" component={SplashPage}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
    </Route>;

ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('rolodex-app')
);