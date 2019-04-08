import React, { Component } from 'react'

import './index.css'

class Prompt extends Component {
    render() {
        return (
            <div id="prompt">
                <div className="title">{this.props.title}</div>
                <div className="Button">
                    <button onClick={this.props.playAgain}>再玩一次</button>
                    <button onClick={this.props.nextLevel}>确定</button>
                </div>
            </div>
        )
    }
}

export default Prompt;
