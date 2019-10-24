import React, { Component } from 'react'
export default class Profile extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h3>ข้อมูลส่วนตัว</h3>
                    <div>
                        <h4>ชื่อ นามสกุล</h4>
                        <p>หมายเลขบัตรประชาชน: 1234567891234</p>
                        <nav>หมายเลขใบอนุญาติ: 
                            <ol>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ol>
                        </nav>
                        <p>อีเมลล์: example@email.com</p>
                        <p>ที่อยู่: </p>
                    </div>
                </div>
            </div>
        )
    }
}
