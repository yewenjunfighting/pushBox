import React, { Component } from 'react'
import gameLevel from '../../assets/LevelData/data'
import { createBox } from '../../controller/box'
import { createTortoise,bindTortoise } from "../../controller/tortoise";

import './index.css'

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = { // level 表示游戏关卡, 初始是第一关
            level: 0
        }
    }

    componentDidMount() {
        bindTortoise(gameLevel[this.state.level], this) // 组件挂在完之后进行keydown事件的绑定
    }

    componentDidUpdate() {
        bindTortoise(gameLevel[this.state.level], this) // 在组件更新之后重新对组件进行事件绑定
    }
    render() {
        let level = this.state.level;
        let levelData = gameLevel[level].map; // 根据关卡数选出对应数据, map是一个数组
        let sideLength = Math.sqrt(levelData.length) * 50;
        let dom = null;
        return (
            <div id="map" style={{ width: sideLength}}>
                {
                    levelData.map((val, index)=>{
                        switch(val) { // 根据elem的值来应用样式
                            case 1 : dom = (<div className="cell" key={index}></div>); break; // 普通格子
                            case 2 : dom = (<div className="wall" key={index}></div>); break;// 墙
                            case 3 : dom = (<div className="target" key={index}></div>); break;// 目标格子
                            default: break;
                        }
                        return dom;
                    })
                }
                { createBox(gameLevel[level])  }
                { createTortoise(gameLevel[level]) }
            </div>
        )
    }
}

export default Map;
