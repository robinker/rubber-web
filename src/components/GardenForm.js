import React from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { Field, getIn } from 'formik'

function GardenForm(props) {
    
    function errorMessage(name){
        return getIn(props.errors, name)
    }
    
    function isTouched(name){
        return getIn(props.touched, name)
    }

    return (
        <>
            <h2>ข้อมูลสวนยาง</h2>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>เนื้อที่สวนยาง (ไร่)</Form.Label>
                        <Field type='number' name={`garden[${props.index}].area`} id="area" placeholder="10"  className={`form-control ${isTouched(`garden[${props.index}].area`) ? errorMessage(`garden[${props.index}].area`)  ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].area`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>ปีที่ปลูก (พ.ศ.)</Form.Label>
                        <Field type='number' name={`garden[${props.index}].startYear`} id="startYear" placeholder="2558" className={`form-control ${isTouched(`garden[${props.index}].startYear`) ? errorMessage(`garden[${props.index}].startYear`) ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].startYear`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>ชื่อพันธุ์ต้นยาง</Form.Label>
                        <Field name={`garden[${props.index}].species`} id="species" placeholder="RRIC 101"  className={`form-control ${isTouched(`garden[${props.index}].species`) ?  errorMessage(`garden[${props.index}].species`) ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].species`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>จำนวนต้นยาง (ต้น)</Form.Label>
                        <Field name={`garden[${props.index}].amount`} id="amount" placeholder="200" className={`form-control ${isTouched(`garden[${props.index}].amount`) ? errorMessage(`garden[${props.index}].amount`) ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].amount`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>รูปแบบการผลิต :</Form.Label>
                        <br></br>
                        <Form.Check inline type="checkbox" name='products' value='น้ำยางสด' label="น้ำยางสด" onChange={props.handleCheck} defaultChecked />
                        <Form.Check inline type="checkbox" name='products' value='ยางก้อนถ้วย' label="ยางก้อนถ้วย" onChange={props.handleCheck}/>
                        <Form.Check inline type="checkbox" name='products' value='ยางแผ่นดิบ' label="ยางแผ่นดิบ" onChange={props.handleCheck}/>
                        <Form.Check inline type="checkbox" name='products' value='ยางแผ่นรมควัน' label="ยางแผ่นรมควัน" onChange={props.handleCheck}/>
                        <Form.Check inline type="checkbox" name='products' value='ขี้ยาง/เศษยาง' label="ขี้ยาง/เศษยาง" onChange={props.handleCheck}/>
                        <Form.Check inline type="checkbox" name='products' value='ยางเครฟ' label="ยางเครฟ" onChange={props.handleCheck}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col><Button onClick={() => props.push({ })}>เพิ่ม</Button></Col>
            </Row>
            <hr/>
        </>
    )
}

export default GardenForm
