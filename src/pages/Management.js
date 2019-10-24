import React, { Component } from 'react'
import { Button, Row, Col, InputGroupAddon, Input, InputGroup, ListGroup, ListGroupItem } from 'reactstrap';
import ListUser from '../components/ListUser';
import { Redirect } from 'react-router-dom';

export default class Management extends Component {

    handleClick = () => {
        return window.location = '/management/profile'
    }
    render() {
        return (
            <div>
                <div className="container">
                    <Row>
                        <Col sm='6'>
                            <h3>จัดการข้อมูลสมาชิก</h3>
                        </Col>
                        
                        <Button onClick={this.handleClick} size='sm'>เพิ่มสมาชิก</Button>
                    </Row>
                    <InputGroup>
                        <Input placeholder='ค้นหา'/>
                        <InputGroupAddon addonType="append"><Button>ค้นหา</Button></InputGroupAddon>
                    </InputGroup>
                    <ListUser></ListUser>
                </div>
            </div>
        )
    }
}
