import React, { Component } from 'react'
import { Button, Row, Col, InputGroup , DropdownButton, Dropdown, FormControl} from 'react-bootstrap';
import ListUser from '../components/ListUser';
import { Link } from 'react-router-dom';

export default class Management extends Component {


    render() {
        return (
            <div>
                <div className="container">
                    <Row>
                        <Col sm='6'>
                            <h3>จัดการข้อมูลสมาชิก</h3>
                        </Col>
                        <DropdownButton id="dropdown-basic-button" title="เพิ่มสมาชิก">
                            <Link to='/management/profile/add' class="dropdown-item">เจ้าของสวนยาง</Link>
                            <Link to='/' class="dropdown-item">พ่อค้าคนกลาง</Link>
                            <Link to='/' class="dropdown-item">Admin</Link>
                        </DropdownButton>
                    </Row>
                    <InputGroup className="mb-3">
                        <FormControl placeholder="ค้นหา"/>
                        <InputGroup.Append addonType="append"><Button>ค้นหา</Button></InputGroup.Append>
                    </InputGroup>
                    <ListUser></ListUser>
                </div>
            </div>
        )
    }
}
