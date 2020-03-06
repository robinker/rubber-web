import React from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import provinces from '../json/provinces'
import { Field } from 'formik'

function UserForm(props) {
    const errors = props.errors
    const touched = props.touched
    return (
        <>
            <h2>ข้อมูลสมาชิก ({props.role})</h2>
            <br></br>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>ชื่อ</Form.Label>
                        <Field name="firstname" id="name" placeholder="ชื่อจริง"  className={`form-control ${touched.firstname ? errors.firstname ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errors.firstname} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>นามสกุล</Form.Label>
                        <Field name="lastname" id="lastname" placeholder="นามสกุลจริง" className={`form-control ${touched.lastname ? errors.lastname ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errors.lastname} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>หมายเลขบัตรประชาชน</Form.Label>
                        <Field name="citizenID" id="citizenID" className={`form-control ${touched.citizenID ? errors.citizenID ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errors.citizenID} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                    <Form.Label>วัน/เดือน/ปี เกิด</Form.Label>
                        <Field type="date" name="birthdate" id="birthdate" className={`form-control ${touched.birthdate ? errors.birthdate ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errors.birthdate === 'date errors' ? 'ข้อมูลไม่ถูกต้อง' : 'กรุณาใส่วัน/เดือน/ปี เกิด'} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>โทรศัพท์มือถือ</Form.Label>
                        <Field name="tel" id="tel" placeholder="" className={`form-control ${touched.tel ? errors.tel ? 'is-invalid' : 'is-valid' : ''}`} />
                        <Form.Control.Feedback type="invalid"> {errors.tel} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>อีเมล</Form.Label>
                        <Field type="email" name="email" id="email" placeholder="example@email.com" className={`form-control ${touched.email ? errors.email ? 'is-invalid' : 'is-valid' : ''}`}/>
                        <Form.Control.Feedback type="invalid"> {errors.email} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>ที่อยู่</Form.Label>
                        <Field name="address" id="address" placeholder="บ้านเลขที่ หมู่ ซอย" className={`form-control ${touched.address ? errors.address ? 'is-invalid' : 'is-valid' : ''}`}/>
                        <Form.Control.Feedback type="invalid"> {errors.address} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>แขวง/ตำบล</Form.Label>
                        <Field name="district" id="district" className={`form-control ${touched.district ? errors.district ? 'is-invalid' : 'is-valid' : ''}`}/>
                        <Form.Control.Feedback type="invalid"> {errors.district} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>เขต/อำเภอ</Form.Label>
                        <Field name="amphure" id="amphure" className={`form-control ${touched.amphure ? errors.amphure ? 'is-invalid' : 'is-valid' : ''}`}/>
                        <Form.Control.Feedback type="invalid"> {errors.amphure} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>จังหวัด</Form.Label>
                        <Field as="select" className="form-control" name="province" id="province">
                            {
                                provinces.map((data, index) => {
                                    return <option key={index} value={data.province_name.trim()}>{data.province_name}</option>
                                })
                            }
                        </Field>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col> 
                    <Form.Group>
                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                        <Field name="zipcode" id="zipcode" className={`form-control ${touched.zipcode ? errors.zipcode ? 'is-invalid' : 'is-valid' : ''}`}/>
                        <Form.Control.Feedback type="invalid"> {errors.zipcode} </Form.Control.Feedback>
                    </Form.Group>  
                </Col>
                { props.role !== 'ผู้ดูแลระบบ' ? 
                    <Col> 
                        <Form.Group>
                            <Form.Label>เลขใบอนุญาตค้ายาง</Form.Label>
                            <Field name="cert" id="cert" className='form-control'/>
                        </Form.Group>  
                    </Col> : null
                }
            </Row>
            <Button onClick={props.next}>ถัดไป</Button>
        </>
    )
}

export default UserForm
