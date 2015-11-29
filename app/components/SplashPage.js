import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class SplashPage extends Component {
    render() {
        return (
            <div>
                <div className="header">


                    <div className="site-introduction">
                        <h1>A searchable database of people you care about</h1>
                    </div>
                </div>
                <div className="container site-about">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae dicta dolorem enim excepturi impedit maxime minus nobis porro possimus quidem quisquam ratione, sed unde veniam. Assumenda iusto modi suscipit?</p>
                </div>
            </div>
        )
    }
}

export default SplashPage;