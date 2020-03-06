
import React from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { Field } from 'formik'

function UserForm(props) {
    const errors = props.errors
    const touched = props.touched
    return (
        <>
            <h2>บัญชีผู้ใช้</h2>
            <br></br>
            <Form.Group>
                <Form.Label>ชื่อบัญชีผู้ใช้ :</Form.Label>
                <Field type="username" name="username" id="username" className={`form-control ${touched.username ? errors.username ? 'is-invalid' : 'is-valid' : ''}`}/>
                <Form.Control.Feedback type="invalid"> {errors.username} </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>รหัสผ่าน :</Form.Label>
                <Field type="password" name="password" id="password" className={`form-control ${touched.password ? errors.password ? 'is-invalid' : 'is-valid' : ''}`}/>
                <Form.Control.Feedback type="invalid"> {errors.password} </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>ยืนยันรหัสผ่าน :</Form.Label>
                <Field type="password" name="confirmPassword" id="confirmPassword" className={`form-control ${touched.confirmPassword ? errors.confirmPassword ? 'is-invalid' : 'is-valid' : ''}`}/>
                <Form.Control.Feedback type="invalid"> {errors.confirmPassword} </Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Col><Button onClick={props.back}>ย้อนกลับ</Button></Col>
                {/* <Col><Button type="submit" disabled={!props.isValid}>ยืนยัน</Button></Col> */}
                <Col><Button type="submit" disabled={!props.isValid}>ยืนยัน</Button></Col>
            </Row>
        </>
    )
}

export default UserForm
