import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <>
                <p>Hello Home page admin</p>
                <button onClick={ () => {
                    this.props.history.push({
                        pathname: '/admin/about/',
                        sendData: {
                            me: "Adrian",
                            height: 175,
                            weight: 55
                        }
                    });
                }}>About</button>
                <button onClick={ () => {
                    this.props.history.push({
                        pathname: '/admin/slider/',
                        sendData: {
                            me: "Adrian",
                            height: 175,
                            weight: 55
                        }
                    });
                }}>Slider</button>
            </>
        )
    }
}
