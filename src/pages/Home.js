import React from 'react'
import Highlight from '../components/Highlight'
import News from '../components/News'

export default function Home() {
    return (
        <div className="container-fluid">
            <Highlight></Highlight>
            <div>
                <h3>News (ข่าวประชาสัมพันธ์)</h3>
            </div>
            <News title1={"Title 1"} title2={"Title 2"}></News>
        </div>
    )
}
