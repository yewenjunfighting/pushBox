import React from 'react'

/**
 * function : 创建箱子, 根据当前level中box对象的x, y为box设置left和top值, 进行绝对定位
 * param : levelData 关卡的数据
 * return : none
 * */
export function createBox (levelData) {
    let box = levelData.box;
    let len = levelData.map.length;
    return box.map((val, index)=>{
        let left = val.x * 50;
        let top = val.y * 50;
        return (
            <div className="box" style={{left, top}} key={len + index}></div>
        )
    })
}
