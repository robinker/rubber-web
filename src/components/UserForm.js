import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
export default class UserForm extends Component {
    render() {
        return (
            <>
                <hr></hr>
                <h2>ข้อมูลสำหรับผู้ใช้เพื่อเข้าใช้งาน</h2>
                <br></br>
                <Form.Group>
                    <Form.Label>Username :</Form.Label>
                    <Form.Control onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password :</Form.Label>
                    <Form.Control type="password" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm-password :</Form.Label>
                    <Form.Control type="password" onChange={this.handleChange}/>
                </Form.Group>
            </>
        )
    }
}
