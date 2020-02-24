import React from 'react'
import { Button, Row, Col, InputGroup, DropdownButton, FormControl } from 'react-bootstrap';
import ListUser from '../components/ListUser';
import { Link } from 'react-router-dom';

function Management() {
    return (
        <div className="container">
            <Row>
                <Col sm='6'>
                    <h3>จัดการข้อมูลสมาชิก</h3>
                </Col>
                <DropdownButton id="dropdown-basic-button" title="เพิ่มสมาชิก">
                    <Link to='/management/profile/add/เจ้าของสวนยาง' className="dropdown-item">เจ้าของสวนยาง</Link>
                    <Link to='/management/profile/add/พ่อค้าคนกลาง' className="dropdown-item">พ่อค้าคนกลาง</Link>
                    <Link to='/management/profile/add/ผู้แลระบบ' className="dropdown-item">ผู้แลระบบ</Link>
                </DropdownButton>
            </Row>
            <InputGroup className="mb-3">
                <FormControl placeholder="ค้นหา" />
                <InputGroup.Append> <Button>ค้นหา</Button> </InputGroup.Append>
            </InputGroup>
            <ListUser></ListUser>
        </div>
    )
}

export default Management
