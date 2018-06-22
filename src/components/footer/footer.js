import React, { Component } from 'react';
import './Footer.css';
import './Bootstrap.min.css';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer bg-danger">
                <span>Copyright &copy; Ai Come 2018</span>
            </div>
        );
    }
}