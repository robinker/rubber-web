import React, { Component } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import provinces from '../json/provinces'
import months from '../json/months'
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
    // email: Yup.string()
    //     .email('Invalid email')
    //     .required('Email is Required'),
    // username: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('Required'),
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
        date: '',
        month: '',
        month_days: [],
        year_list: [],
        year: '',
        username: '',
        password: '',
    }

    componentDidMount() {
        let date = new Date()
        const year = date.getFullYear() + 543
        let year_list = []
        for (let i = year; i >= year - 120; i--){
            year_list.push(i)
        }
        this.setState({
            province: provinces[0].province_name,
            month: months[0].month_name,
            month_days: months[0].month_days,
            year_list
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleChangeMonth = (event) => {
        this.setState({
            month: months[event.target.value-1].month_name,
            month_days: months[event.target.value-1].month_days,
        })
    }

    handleSubmit = () => {
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
        // event.preventDefault()
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
                        birthdate: '',
                        amphure: '',
                        district: '',   
                        zipcode: '',
                    }}
                    onSubmit={this.handleSubmit}
                >
                    {({ errors, touched}) => (
                        <FormIK >
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
                                    <Form.Label>วัน/เดือน/ปี เกิด {this.state.date + '/' + this.state.month + '/' + this.state.year}</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Control as="select" name="date" id="date" onChange={this.handleChange}>
                                                    <option defaultValue="">--</option>
                                                    {
                                                        this.state.month_days.map((day, index) => {
                                                            return <option key={index} devalue={day}>{day}</option>
                                                        })
                                                    }
                                                </Form.Control>
                                            </Col>
                                            
                                            <Col>
                                                <Form.Control as="select" name="month" id="month" onChange={this.handleChangeMonth}>
                                                    { 
                                                        months.map((month, index) => {
                                                            return <option key={index} value={month.month_id}>{month.month_name}</option>
                                                        })
                                                    }
                                                </Form.Control>
                                            </Col>
                                            
                                            <Col>
                                                <Form.Control as="select" name="year" id="year" onChange={this.handleChange}>
                                                    { 
                                                        this.state.year_list.map((year, index) => {
                                                            return <option key={index} value={year}>{year}</option>
                                                        })
                                                    }
                                                </Form.Control>
                                            </Col>

                                            <Form.Control.Feedback type="invalid"> {errors.birthdate} </Form.Control.Feedback>
                                        </Row>
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
                                        <Form.Control type="email" name="email" id="email" placeholder="example@email.com"/>
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
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>เขต/อำเภอ</Form.Label>
                                        <Form.Control name="amphure" id="amphure" onChange={this.handleChange}>
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
