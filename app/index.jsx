import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import SplashPage from './components/SplashPage';

require('./scss/main.scss');

class App extends Component {
    render() {
        return (
            <div>
                <SplashPage />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('rolodex-app')
);
