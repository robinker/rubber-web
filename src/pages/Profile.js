import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

function Profile() {

    const user = useSelector(state => state.user)

    return (
        <Container>
            <h4>ชื่อ นามสกุล: {user.firstname + " " + user.lastname} ({user.role})</h4>
            <p>หมายเลขบัตรประชาชน: {user.citizen_id}</p>
            { user.role === 'ผู้ดูแลระบบ' ? null : <p>หมายเลขใบอนุญาติ: {user.cert_1} </p> }
            <p>อีเมล: {user.email ? user.email : "-"}</p>
            <p> {`${user.address} ตำบล ${user.subdistrict} อำเภอ ${user.district} ${user.zipcode} จังหวัด ${user.province}`} </p>
            {user.role === 'เกษตรกร' ? <h1>ข้อมูลสวนยาง</h1> : null}
            {
                user.gardens.map((garden, index)=> (
                    <React.Fragment key={index}>
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
                        <br></br>
                        {garden.address} {garden.district} {garden.subdistrict} {garden.zipcode} {garden.province}
                        </p>
                        <Link to={{ pathname: '/profile/edit/garden',
                            gardenID: garden._id,
                            index: index,
                            garden: garden
                        }} 
                        className='btn btn-primary'>อัพเดท</Link>
                        <hr></hr>
                    </React.Fragment>)
                )
            }
        </Container>
    )
}

export default Profile