import React, { Component } from 'react'
import indexPage from '../../assets/imgs/indexPage.jpg'

import './index.css'

class Home extends Component {
    render() {
        return (
            <div>
                <img src={indexPage} alt="indexPage"/>
            </div>
        )
    }
}

export default Home;
