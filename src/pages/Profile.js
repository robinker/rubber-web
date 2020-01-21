import React from 'react'

export default function Profile(props) {
    return (
        <div className="container">
            <h3>ข้อมูลส่วนตัว</h3>
            <div>
            <h4>ชื่อ นามสกุล: {props.user.firstname + " " + props.user.lastname} ({props.user.role})</h4>
                <p>หมายเลขบัตรประชาชน: 1234567891234</p>
                { 
                    props.user.role === 'ผู้ดูแลระบบ' ? null : <p>หมายเลขใบอนุญาติ: {props.user.cert_1} </p>
                }
                <p>อีเมลล์: example@email.com</p>
            </div>
        </div>
    )
}

