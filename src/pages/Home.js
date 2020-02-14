import React from 'react'
import Hightlight from '../components/Hightlight'
import News from '../components/News'

export default function Home() {
    return (
        <div className="container-fluid">
            <Hightlight></Hightlight>
            <div>
                <h3>News (ข่าวประชาสัมพันธ์)</h3>
            </div>
            <News title1={"Title 1"} title2={"Title 2"}></News>
        </div>
    )
}
