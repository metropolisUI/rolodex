import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class SplashPage extends Component {
    render() {
        return (
            <div className="header">
                <nav className="nav site-nav">
                    <div className="container">
                        <ul className="nav nav-pills navbar-left">
                            <li><a href="" className="logo">Rolodex.me</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">Documentation</a></li>
                        </ul>
                        <ul className="nav nav-pills navbar-right">
                            <li><a href="">Join</a></li>
                            <li><a href="">Log In</a></li>
                        </ul>
                    </div>
                </nav>

                <div className="site-introduction">
                    <h1>A searchable database of people you care about</h1>
                </div>
            </div>
        )
    }
}

export default SplashPage;