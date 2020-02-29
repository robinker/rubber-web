import React from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { Field } from 'formik'

function GardenForm(props) {
    const errors = props.errors
    const touched = props.touched
    return (
        <>
            <h2>ข้อมูลสวนยาง</h2>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>เนื้อที่สวนยาง (ไร่)</Form.Label>
                        <Field type='number' name="area" id="area" placeholder="10"  className={`form-control ${touched.area ? errors.area ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errors.area} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>ปีที่ปลูก (พ.ศ.)</Form.Label>
                        <Field type='number' name="startYear" id="startYear" placeholder="2558" className={`form-control ${touched.startYear ? errors.startYear ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errors.startYear} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>ชื่อพันธุ์ต้นยาง</Form.Label>
                        <Field name="species" id="species" placeholder="RRIC 101"  className={`form-control ${touched.species ? errors.species ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errors.species} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>จำนวนต้นยาง (ต้น)</Form.Label>
                        <Field name="amount" id="amount" placeholder="200" className={`form-control ${touched.amount ? errors.amount ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errors.amount} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <hr></hr>
        </>
    )
}

export default GardenForm
