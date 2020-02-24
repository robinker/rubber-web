import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const user = useSelector(state => state.user)
    return (
        <div className="container">
            <div>
            <h4>ชื่อ นามสกุล: {user.firstname + " " + user.lastname} ({user.role})</h4>
                <p>หมายเลขบัตรประชาชน: 1234567891234</p>
                { user.role === 'ผู้ดูแลระบบ' ? null : <p>หมายเลขใบอนุญาติ: {user.cert_1} </p> }
                <p>อีเมลล์: example@email.com</p>
            </div>
        </div>
    )
}

export default Profile