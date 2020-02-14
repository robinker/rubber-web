import React, { Component } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import provinces from '../json/provinces'
// import amphures from '../json/amphures'
// import districts from '../json/districts'
// import zipcodes from '../json/zipcodes'
import { Formik, Form as FormIK, Field } from 'formik'
import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('กรุณากรอกชื่อ'),
    lastname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('กรุณากรอกนามสกุล'),  
    citizenID: Yup.string()
        .min(13, 'Too Short!')
        .max(13, 'Too Long!')
        .required('กรุณากรอกรหัสบัตรประชาชน'),
    birthdate: Yup.date()
        .default(() => new Date())
        .max(new Date(), 'date errors'),
    email: Yup.string()
        .email('อีเมลล์ไม่ถูกต้อง')
        .required('กรุณากรอกอีเมลล์'),
    username: Yup.string()
        .min(4, 'กรุณากรอกอย่างน้อย 4 ตัวอักษร')
        .required('กรุณากรอกชื่อบัญชีผู้ใช้'),
    password: Yup.string()
        .min(4, 'รหัสผ่านต้องมีอย่างน้อย 4 ตัว')
        .required('กรุณากรอกรหัสผ่าน'),
    confirmPassword: Yup.string()
        .required('กรุณากรอกรหัสผ่านยืนยัน')
        //check password match
        .test('passwords-match', 'รหัสผ่านไม่ตรงกัน', function (value) {
            return this.parent.password === value;
        }),
  });

export default class RegisterForm extends Component {

    // componentDidMount() {
    //     this.setState({
    //         province: provinces[0].province_name,
    //         provinceID: provinces[0].province_id,
    //         // amphure: amphures[0].amphur_name,
    //         // amphurID: amphures[0].amphur_id,
    //         // district: districts[0].district_name,
    //         // districtCode: districts[0].district_code,
    //         // zipcode: zipcodes[0].zipcode_name,
    //     })
    // }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    
    render() {
        return (
            <div className='container'>
                <h2>ข้อมูลสมาชิก</h2>
                <br></br>
                <Formik validationSchema={RegisterSchema}
                    initialValues={{ //กำหนด initialValues
                        firstname: '',
                        lastname: '',
                        citizenID: '',
                        email: '',
                        birthdate: new Date(),
                        province: provinces[0].province_name,
                        amphure: '',
                        district: '',
                        zipcode: '',
                        username: '',
                        password: '',
                    }}
                    onSubmit={values => {
                        // same shape as initial values 
                        console.log(values);
                    }}
                >
                    {({ errors, touched}) => (
                        <FormIK>
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
                                        <Field type="date" format="dd/mm/yyyy" name="birthdate" id="birthdate" className={`form-control ${touched.birthdate ? errors.birthdate ? 'is-invalid' : 'is-valid' : ''}`} />
                                        <Form.Control.Feedback type="invalid"> {errors.birthdate === 'date errors' ? 'Date is invalid' : 'กรุณาใส่วัน/เดือน/ปี เกิด'} </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>โทรศัพท์มือถือ</Form.Label>
                                        <Form.Control name="tel" id="tel" placeholder="" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>อีเมลล์</Form.Label>
                                        <Field type="email" name="email" id="email" placeholder="example@email.com" className={`form-control ${touched.email ? errors.email ? 'is-invalid' : 'is-valid' : ''}`}/>
                                        <Form.Control.Feedback type="invalid"> {errors.email} </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>ที่อยู่</Form.Label>
                                        <Form.Control name="address" id="address" placeholder="บ้านเลขที่ หมู่ ซอย" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>แขวง/ตำบล</Form.Label>
                                        <Form.Control name="district" id="district" onChange={this.handleChange}>
                                            {/* {
                                                districts.map((data, index) => {
                                                    if(this.state.amphurID === data.amphur_id){
                                                        return <option key={index} value={data.district_id}>{data.district_name}</option>
                                                    }
                                                })
                                            } */}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>เขต/อำเภอ</Form.Label>
                                        <Form.Control name="amphure" id="amphure" onChange={this.handleChange}>
                                            {/* {
                                                amphures.map((data, index) => {
                                                    if(this.state.provinceID === data.province_id){
                                                        return <option key={index} value={data.amphur_id}>{data.amphur_name}</option>
                                                    }
                                                })
                                            } */}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>จังหวัด</Form.Label>
                                        <Field as="select" className="form-control" name="province" id="province">
                                            {
                                                provinces.map((data, index) => {
                                                    return <option key={index} value={data.province_name}>{data.province_name}</option>
                                                })
                                            }
                                        </Field>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}> 
                                    <Form.Group>
                                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                                        <Form.Control type="text" name="zip" id="zip" onChange={this.handleChange}/>
                                    </Form.Group>  
                                </Col>
                            </Row>
                            <hr></hr>
                            <h2>บัญชีผู้ใช้</h2>
                            <br></br>
                            <Form.Group>
                                <Form.Label>ชื่อบัญชีผู้ใช้ :</Form.Label>
                                <Form.Control onChange={this.handleChange}/>
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

                            <Button type="submit">ยืนยัน</Button>
                        </FormIK>
                    )}
                </Formik>
            </div>
        )
    }
}
