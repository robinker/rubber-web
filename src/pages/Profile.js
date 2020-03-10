import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Profile() {

    const user = useSelector(state => state.user)
    const [gardens, setGardens] = useState([])

    useEffect(() => {
            axios.get(`https://rubber-backend.herokuapp.com/users/gardens/${user._id}`)
            .then(res => {
                setGardens(res.data)
            })
    }, [user._id])

    return (
        <div className="container">
            <h4>ชื่อ นามสกุล: {user.firstname + " " + user.lastname} ({user.role})</h4>
                <p>หมายเลขบัตรประชาชน: 1234567891234</p>
                { user.role === 'ผู้ดูแลระบบ' ? null : <p>หมายเลขใบอนุญาติ: {user.cert_1} </p> }
                <p>อีเมลล์: example@email.com</p>
                <p> {`${user.address} ตำบล ${user.subdistrict} อำเภอ ${user.district} ${user.zipcode} จังหวัด ${user.province}`} </p>
                {user.role === 'เกษตรกร' ? <h1>ข้อมูลสวนยาง</h1> : null}
                {
                    gardens.map((garden, index)=> {
                        return <React.Fragment key={index}>
                            <p> เนื้อที่สวนยาง: {garden.area} ไร่<br></br>
                                ปีที่ปลูก: {garden.startYear} <br></br>
                                ชื่อพันธุ์ยาง: {garden.species} <br></br>
                                จำนวนต้นยาง: {garden.amount} ต้น<br></br>
                                รูปแบบการผลิต: 
                            {
                                garden.products.map((product, index) => {
                                    if(index+1 === garden.products.length){
                                        return ' ' + product
                                    }
                                    return ' ' + product + ', '
                                })
                            }
                            </p>
                            <hr></hr>
                        </React.Fragment>
                    })
                }
        </div>
    )
}

export default Profile