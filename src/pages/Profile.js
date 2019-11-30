import React from 'react'

export default function Profile(props) {
    return (
        <div className="container">
            <h3>ข้อมูลส่วนตัว</h3>
            <div>
            <h4>ชื่อ นามสกุล: {props.user.firstname + " " + props.user.lastname}</h4>
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
            </div>
        </div>
    )
}

