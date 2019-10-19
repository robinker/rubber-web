import React, { Component } from 'react'
import Header from '../components/Header'
import Hightlight from '../components/Hightlight'
export default class Home extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div className="container-fluid">
                    <Hightlight></Hightlight>
                </div>
            </div>
        )
    }
}
