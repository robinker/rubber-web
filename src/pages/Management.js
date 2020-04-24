import React, { useEffect, useState }  from 'react'
import { Row, Col, DropdownButton, FormControl } from 'react-bootstrap';
import ListUser from '../components/ListUser';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Management() {
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [search, setSearch] = useState([])

    useEffect(() => {
        const CancleToken = axios.CancelToken
        const source = CancleToken.source()
        axios.get('https://rubber-backend.herokuapp.com/users/', {cancelToken: source.token})
        .then(res => {
            setUsers(res.data)
            setLoaded(true)
        })
        .catch(err => {
            console.log('Error: ', err)
        })
        return (() => {
            source.cancel()
        })
    },[])

    function onSearch(event) {
        let filter = []
        if(event.target.value !== ''){
            filter = users.filter(user => user.firstname.includes(event.target.value) || user.lastname.includes(event.target.value))
            setSearch(filter)
        } else {
            setSearch([])
        }
    }

    return (
        <div className="container">
            <Row>
                <Col sm='6'>
                    <h3>จัดการข้อมูลสมาชิก</h3>
                </Col>
                <DropdownButton id="dropdown-basic-button" title="เพิ่มสมาชิก">
                    <Link to='/management/profile/add/เกษตรกร' className="dropdown-item">เกษตรกร</Link>
                    <Link to='/management/profile/add/พ่อค้าคนกลาง' className="dropdown-item">พ่อค้าคนกลาง</Link>
                    <Link to='/management/profile/add/ผู้ดูแลระบบ' className="dropdown-item">ผู้แลระบบ</Link>
                </DropdownButton>
            </Row>
            <br></br>
            <FormControl placeholder="ค้นหา" onChange={onSearch} />
            <br></br>
            <ListUser users={search.length === 0 ? users : search} loaded={loaded}></ListUser>
        </div>
    )
}

export default Management
