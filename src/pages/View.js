import React, {useEffect, useState} from 'react'
import axios from 'axios'

function View(props) {

    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('https://rubber-backend.herokuapp.com/users/' + props.location.state.userId)
        .then(res => {
            setUser(res.data)
            setLoaded(true)
        })
    },[props.location.state.userId])
    
    return loaded ? (
        <div className="container">
            <h4>ชื่อ นามสกุล: {user.firstname + " " + user.lastname} ({user.role})</h4>
            <p>หมายเลขบัตรประชาชน: 1234567891234</p>
            { user.role === 'ผู้ดูแลระบบ' ? null : <p>หมายเลขใบอนุญาติ: {user.cert_1} </p> }
            <p>อีเมลล์: example@email.com</p>
        </div>
    ) : (<h1 className="container"> loading..</h1>)
    
}

export default View