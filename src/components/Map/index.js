import React, { Component } from 'react'
import Cloud from '../Cloud'
import FireWork from '../FireWork'
import Prompt from '../Prompt'
import gameLevel from '../../assets/LevelData/data'
import { createBox, storeBoxPos } from '../../controller/box'
import PlayChoose from '../PlayChoose'
import { createTortoise, bindTortoise, storeTortoisePos } from "../../controller/tortoise"
import { Redirect } from 'react-router-dom'

import './index.css'

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = { // level 表示游戏关卡, 初始是第一关
            level: 0,
            success: false,
            process: '闯关成功, 赶快试试下一关吧!',
            midProcess: '再接再厉, 还剩最后一关咯!',
            result: '恭喜你过了最难的一关！回首页看看吧!',
            jump: false, // jump用于判断是否进行路由跳转
        };
        this.playAgain = this.playAgain.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
    }

    componentWillMount() {
        // 存储乌龟和box的坐标
       if(!window.sessionStorage.getItem('tortoise')) {
           storeBoxPos(gameLevel[this.state.level].box);
           storeTortoisePos(gameLevel[this.state.level].tortoise);
       }
        // 判断是否是通过Link跳转过来的
        let queryStr = this.props.location.search.split('?')[1];
        if(queryStr) {
            this.setState({
                level: parseInt(queryStr.split('=')[1]) // 因为查询串取下的level是string类型的,这里要转为number类型,否则在切换到下一关时会因为字符串相加而找不到对应的数据出错
            })
        }
    }

    componentDidMount() {
        bindTortoise(gameLevel[this.state.level], this) // 组件挂在完之后进行keyDown事件的绑定
    }

    componentWillUpdate() {
        // 当下一关的时候更新box和乌龟的位置
        console.log(this.state.level)
    }

    componentDidUpdate() {
        // 重新开始游戏
       if(!this.state.success) {
           createTortoise(gameLevel[this.state.level], true); // 注意这时候因为传入了true,所以不会返回jsx,而是对已经更新完成的tortoise进行定位，下面的createBox也是同理
           createBox(gameLevel[this.state.level], true);
           bindTortoise(gameLevel[this.state.level], this) // 在组件更新之后重新对组件进行事件绑定
       }
    }

    componentWillUnmount() {
        // window.sessionStorage.clear();
    }

    playAgain() {
        // 重玩一次就把sessionStorage置为初始位置
        storeBoxPos(gameLevel[this.state.level].box);
        storeTortoisePos(gameLevel[this.state.level].tortoise);
        // playAgain有两种调用情况 1.在游戏过程中,因为走错一步而无法完成,要playAgain 2.这局通关了,想再玩一次,要playAgain
        if(this.state.success) {
            this.setState((state)=>{
                return {
                    success: !state.success
                }
            })
        }else {
            console.log('重玩一次');
            this.setState((state)=>{ // 属于第一种的playAgain, 仅仅想要把乌龟和box复位而已
                return {
                    success: state.success
                }
            })
        }
    }

    nextLevel() { // nextLevel有两种调用情况 1.在游戏过程中,因为完成这关要进入下一关,调用nextLevel 2.最后一关完成了,要跳转到levelChoose组件,调用playAgain
        if(this.state.level === 2) {
            this.setState((state)=>{
                return {
                    jump: !state.jump
                }
            })
        }else {
            this.setState((state)=>{
                storeBoxPos(gameLevel[state.level + 1].box);
                storeTortoisePos(gameLevel[state.level + 1].tortoise);
                return {
                    level: state.level + 1,
                    success: !state.success
                }
            })
        }
    }

    render() {
        // level表示游戏进行到第level + 1关
        let level = this.state.level;
        // 根据关卡数选出对应数据, map是一个数组
        let levelData = gameLevel[level].map;
        // 设置第level + 1关，每个div元素的大小为50 * 50px
        let sideLength = Math.sqrt(levelData.length) * 50;
        let dom = null;
        return (
            <div className="container">
                { this.state.jump ? <Redirect to={{ pathname: '/levelChoose' }} /> : ''}
                <Cloud />
                <PlayChoose playAgain={this.playAgain}/>
                <div id="map" style={{ width: sideLength}}>
                    {
                        levelData.map((val, index)=>{
                            switch(val) { // 根据elem的值来应用样式
                                case 1 : dom = (<div className="cell" key={index}></div>); break; // 普通格子
                                case 2 : dom = (<div className="wall" key={index}></div>); break;// 墙
                                case 3 : dom = (<div className="target" key={index}></div>); break;// 目标格子
                                default: break;
                            }
                            return dom; // 返回用jsx表示的dom, react会帮我们渲染出来
                        })
                    }
                    { createBox(gameLevel[level])  }
                    { createTortoise(gameLevel[level]) }
                    { this.state.success && this.state.level === 2 ? (<FireWork />) : '' }
                    { this.state.success ?  <Prompt
                        playAgain={this.playAgain}
                        nextLevel={this.nextLevel}
                        title={this.state.level === 2 ? this.state.result : (this.state.level === 0 ? this.state.process : this.state.midProcess)}/> : '' }
                </div>
            </div>
        )
    }
}

export default Map;
