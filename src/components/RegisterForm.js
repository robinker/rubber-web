import React, { Component } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import provinces from '../json/provinces'
import amphures from '../json/amphures'
import districts from '../json/districts'
import zipcodes from '../json/zipcodes'
import { Formik, Form as FormIK, Field } from 'formik'
import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),  
    citizenID: Yup.string()
        .min(13, 'Too Short!')
        .max(13, 'Too Long!')
        .required('Required'),
    birthdate: Yup.date()
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is Required'),
    // password: Yup.string()
    //     .min(3, 'Please Enter less then 3 letters')
    //     .required('Password is Required'),
    // confirmpassword: Yup.string()
    //     .min(3, 'Please Enter less then 3 letters')
    //     .required('Password is Required')
    //     //check password match
    //     .test('passwords-match', 'Passwords must match ya fool', function (value) {
    //         return this.parent.password === value;
    //     }),
  });

export default class RegisterForm extends Component {

    state = {
        firstname: '',
        lastname: '',
        citizenID: '',
        birthdate: '',
        loading: false,
        province: '',
        amphure: '',
        district: '',
        provinceID: '',
        amphurID: '',
        districtCode: '',
        zipcode: '',
    }

    componentDidMount() {
        this.setState({
            province: provinces[0].province_name,
            provinceID: provinces[0].province_id,
            amphure: amphures[0].amphur_name,
            amphurID: amphures[0].amphur_id,
            district: districts[0].district_name,
            districtCode: districts[0].district_code,
            zipcode: zipcodes[0].zipcode_name,
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
        
    }
    
    // handleChangeProvince = (event) => {
    //     const provinceName = event.target.value
    //     const p = provinces.find(province => province.province_name === provinceName)
    //     const a = amphures.find(amphur => amphur.province_id === p.province_id)
    //     const d = districts.find(district => district.amphur_id === a.amphur_id)
    //     const z = zipcodes.find(zipcode => d.district_code === zipcode.district_code)

    //     this.setState({
    //         province: p.province_name,
    //         provinceID: p.province_id,
    //         amphure: a.amphur_name,
    //         amphurID: a.amphur_id,
    //         district: d.district_name,
    //         districtCode: d.district_code,
    //         zipcode: z.zipcode_name
    //     })
    // }

    // handleChangeAmphur = (event) => {
    //     const amphurID = event.target.value
    //     const a = amphures.find(amphur => amphur.province_id === this.state.provinceID && amphur.amphur_id === amphurID)
    //     const d = districts.find(district => district.amphur_id === amphurID)
    //     const z = zipcodes.find(zipcode => d.district_code === zipcode.district_code)
    //     console.log(d)

    //     this.setState({
    //         amphure: a.amphur_name,
    //         amphurID: amphurID,
    //         district: d.district_name,
    //         districtCode: d.district_code,
    //         zipcode: z.zipcode_name
    //     })
    // }

    // hadleChangeDistrict = (event) => {
    //     const districtID = event.target.value
    //     const d = districts.find(district => district.district_id === districtID)
    //     const z = zipcodes.find(zipcode => d.district_code === zipcode.district_code)
    //     console.log(d)
    //     this.setState({
    //         district: d.district_name,
    //         districtCode: d.district_code,
    //         zipcode: z.zipcode_name
    //     })
    // }


    handleSubmit = (event) => {
        const { amphure, amphurID } = this.state
        console.log(amphure, amphurID)
        // axios.post('http://localhost:5000/users/login',
        //     {
        //         username: username,
        //         password: password
        //     },
        //     { withCredentials: true }
        // )
        //     .then(res => {
        //         if(res.data.message === 'Logged In'){
        //             // dispatch(signIn())
        //             window.location = '/'
        //         }
        //     })
        //     .catch(err => {
        //         console.log('Error: ', err)
        //     })
        event.preventDefault()
    }

    

    render() {
        return (
            <div className='container'>
                <Formik validationSchema={RegisterSchema}
                    initialValues={{ //กำหนด initialValues
                        firstname: '',
                        lastname: '',
                        citizenID: '',
                        birthdate: '',
                        amphure: '',
                        district: '',
                        zipcode: '',
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
                                        <Field  name="citizenID" id="citizenID" className={`form-control ${touched.citizenID ? errors.citizenID ? 'is-invalid' : 'is-valid' : ''}`} />
                                        <Form.Control.Feedback type="invalid"> {errors.citizenID} </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>วัน/เดือน/ปี เกิด</Form.Label>
                                        <Field type="date" name="password" id="examplePassword" placeholder="password placeholder" className={`form-control ${touched.birthdate ? errors.birthdate ? 'is-invalid' : 'is-valid' : ''}`} />
                                        <Form.Control.Feedback type="invalid"> {errors.birthdate} </Form.Control.Feedback>
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
                                        <Form.Control name="address" id="address" placeholder="บ้านเลขที่, หมู่, ซอย" />
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
                                        <Form.Control as="select" name="province" id="province" onChange={this.handleChangeProvince}>
                                            {
                                                provinces.map((data, index) => {
                                                    return <option key={index} value={data.province_name}>{data.province_name}</option>
                                                })
                                            }
                                        </Form.Control>
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
                            <Button type="submit">ยืนยัน</Button>
                        </FormIK>
                    )}
                </Formik>
            </div>
        )
    }
}
