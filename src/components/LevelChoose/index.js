import React, { Component } from 'react'
import level from '../../assets/imgs/level.jpg'
import { Link } from 'react-router-dom'

import './index.css'

class LevelChoose extends Component {
    render() {
        return (
                <div id="levelChoose">
                    <img src={level} alt="图片"/>
                    <div className="levelLink">
                        <Link to={{
                            pathname: "/map",
                            search: "?level=0"
                        }}>简单</Link>
                        <Link to={{
                            pathname: "/map",
                            search: "?level=0"
                        }}>中等</Link>
                        <Link to={{
                            pathname: "/map",
                            search: "?level=0"
                        }}>困难</Link>
                        <Link to={{
                            pathname: "/"
                        }}>返回首页</Link>
                    </div>
                </div>
        )
    }
}

export default LevelChoose;
