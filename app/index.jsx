import React from 'react';
import ReactDOM from 'react-dom';

require('./scss/main.scss');

var App = React.createClass({
    render: function(){
        return(
            <h1>Hello World</h1>
        )
    }
});
ReactDOM.render(
<App />,
    document.getElementById('rolodex-app')
);