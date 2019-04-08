import React, { Component } from 'react'
import reStart from '../../assets/imgs/reStart.jpg'
import levelChoose from '../../assets/imgs/levelChoose.jpg'

import './index.css'

class PlayChoose extends Component {
    render() {
        return (
            <div>
                <img src={reStart} alt="图片"/>
                <img src={levelChoose} alt="图片"/>
            </div>
        )
    }
}

export default PlayChoose;
