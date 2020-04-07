import React, { useState } from 'react'
import { Breadcrumb, Container, Row, Col, Button, Form as FormB } from 'react-bootstrap'
import UserForm from './UserForm'
import GardenForm from './GardenForm'
import provinces from '../json/provinces'
import { Formik, Form, FieldArray, Field } from 'formik'
import axios from 'axios'
import { RegisterSchema, MiddlemanSchema, GardenerSchema} from './Schema'

function RegisterForm(props) {

    function onSubmit(values) {
        // admin
        let user = {
            firstname: values.firstname,
            lastname: values.lastname,
            citizen_id: values.citizenID,
            birthdate: values.birthdate,
            tel: values.tel,
            email: values.email,
            address: values.address,
            subdistrict: values.subdistrict,
            district: values.district,
            province: values.province,
            zipcode: values.zipcode,
            username: values.username,
            password: values.password,
            role: props.match.params.role
        }

        let gardens = {}
        if(props.match.params.role === 'เกษตรกร') {
            user = {
                ...user,
                cert_1: values.cert
            }
            gardens = values.garden

        }
        else if(props.match.params.role === 'พ่อค้าคนกลาง') {
            user = {
                ...user,
                cert_1: values.cert
            }
        }
        // console.log(user)
        // console.log(gardens)
        // console.log(test)

        axios.post('https://rubber-backend.herokuapp.com/users/add', {
            user, gardens
        })
        .then(res => {
            if (res.data === 'User added!') {
                var paramsCreate = new URLSearchParams();
                paramsCreate.append('accountName', user.firstname + user.lastname);
                     
                var paramShareToAdmin = new URLSearchParams();
                paramShareToAdmin.append('accountNameShared', user.firstname + user.lastname)
                paramShareToAdmin.append('shareTo', "O=Admin,L=Bangkok,C=TH")
        
                const config = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  }
                console.log(res.data)  
                if(props.match.params.role === 'เกษตรกร') {
                    axios.post('http://13.76.35.161/api/agriculturist/blockchainTransaction/createNewAccount', paramsCreate, config)
                    .then(res => {
                        console.log(res.data.status)
                        console.log(res.status)
                        console.log(res.data.message)
                        if (res.data.status === 'OK') {
                            alert('บันทึกข้อมูลสำเร็จ')
                            axios.post('http://13.76.35.161/api/agriculturist/blockchainTransaction/shareAccount', paramShareToAdmin, config) 
                            .then(res => {    
                                if (res.status === 'OK') {
                                    alert('บันทึกข้อมูลสำเร็จ')
                                }
                            })
                            .catch(err => {
                                alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
                            }) 
                        }
                    })
                    .catch(err => {
                        alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
                    })    
                }
                else if(props.match.params.role === 'พ่อค้าคนกลาง') {
                    axios.post('http://13.76.35.161/api/middleman/blockchainTransaction/createNewAccount', paramsCreate, config)
                    .then(res => {
                        console.log(res.data.status)
                        console.log(res.status)
                        if (res.data.status === 'OK') {
                            alert('บันทึกข้อมูลสำเร็จ')
                            .then(res => {
                                axios.post('http://13.76.35.161/api/middleman/blockchainTransaction/shareAccount', paramShareToAdmin, config)
                                if (res.status === 'OK') {
                                    alert('บันทึกข้อมูลสำเร็จ')
                                }
                            })
                            .catch(err => {
                                alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
                            })
         
                        }
                    })
                    .catch(err => {
                        alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
                    }) 
                }
                alert('บันทึกข้อมูลสำเร็จ')
            }
        })
        .catch(err => {
            alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
        })
    }

    const [page, setForm] = useState(1)
    function nextForm() {
        if(props.match.params.role === 'เกษตรกร'){
            setForm(page => page + 1)
        } else {
            setForm(page => page + 2)
        }
    }

    function previousForm(){
        if(props.match.params.role === 'เกษตรกร'){
            setForm(page => page - 1)
        } else {
            setForm(page => page - 2)
        }
    }

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item active={page===1} onClick={() => setForm(1)}>ข้อมูลผู้ใช้</Breadcrumb.Item>
                {   props.match.params.role === 'เกษตรกร' ? 
                    <Breadcrumb.Item active={page===2} onClick={() => setForm(2)}> ข้อมูลสวนยาง </Breadcrumb.Item> : null }
                <Breadcrumb.Item active={ page===3} onClick={() => setForm(3)}> บัญชีผู้ใช้ </Breadcrumb.Item>
            </Breadcrumb>
            <Formik validationSchema={ props.match.params.role === 'ผู้ดูแลระบบ' ? RegisterSchema : props.match.params.role === 'เกษตรกร' ? GardenerSchema : MiddlemanSchema}
                initialValues={{ //กำหนด initialValues
                    firstname: "",
                    lastname: "",
                    citizenID: "",
                    birthdate: new Date(),
                    tel: "",
                    email: "",
                    address: "",
                    subdistrict: "",
                    district: "",
                    province: provinces[0].province_name,
                    zipcode: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                    garden: [{
                            area: "",
                            startYear: "",
                            species: "",
                            amount: "",
                            address: "",
                            subdistrict: "",
                            district: "",
                            province: provinces[0].province_name,
                            zipcode: "",
                            products: ['น้ำยางสด']
                        }]
                }}
                onSubmit={values => { //  send data to backend
                    onSubmit(values)
                }}>
                {({ values, errors, touched, isValid, dirty }) => (
                    <Form>
                        {page === 1 ? <UserForm errors={errors} touched={touched} role={props.match.params.role} next={nextForm} isValid={isValid}></UserForm> : null }
                        {
                            props.match.params.role === 'เกษตรกร' && page===2 ? 
                            <FieldArray name='garden'>
                                { 
                                    (arrayHelpers) => (
                                    <>
                                    {
                                        values.garden.map((g, index) => {
                                            return (
                                                <GardenForm errors={errors} touched={touched} index={index} arrayHelpers={arrayHelpers} key={index} values={values}/>
                                            )
                                        })
                                    }
                                        <Row>
                                            <Col><Button onClick={previousForm}>ย้อนกลับ</Button></Col>
                                            <Col><Button onClick={nextForm}>ถัดไป</Button></Col>
                                        </Row>
                                    </>
                                    ) 
                                }
                            </FieldArray> : null
                        }

                        {/* {page === 3 ? <AccountForm errors={errors} touched={touched} role={props.match.params.role} 
                        next={nextForm} back={previousForm} isValid={dirty && isValid}></AccountForm> : null} */}
                        {page === 3 ? <>
                            <h2>บัญชีผู้ใช้</h2>
                            <br></br>
                            <FormB.Group>
                                <FormB.Label>ชื่อบัญชีผู้ใช้ :</FormB.Label>
                                <Field type="username" name="username" id="username" className={`form-control ${touched.username ? errors.username ? 'is-invalid' : 'is-valid' : ''}`}/>
                                <FormB.Control.Feedback type="invalid"> {errors.username} </FormB.Control.Feedback>
                            </FormB.Group>
                            <FormB.Group>
                                <FormB.Label>รหัสผ่าน :</FormB.Label>
                                <Field type="password" name="password" id="password" className={`form-control ${touched.password ? errors.password ? 'is-invalid' : 'is-valid' : ''}`}/>
                                <FormB.Control.Feedback type="invalid"> {errors.password} </FormB.Control.Feedback>
                            </FormB.Group>
                            <FormB.Group>
                                <FormB.Label>ยืนยันรหัสผ่าน :</FormB.Label>
                                <Field type="password" name="confirmPassword" id="confirmPassword" className={`form-control ${touched.confirmPassword ? errors.confirmPassword ? 'is-invalid' : 'is-valid' : ''}`}/>
                                <FormB.Control.Feedback type="invalid"> {errors.confirmPassword} </FormB.Control.Feedback>
                            </FormB.Group>
                            <Row>
                                <Col><Button onClick={previousForm}>ย้อนกลับ</Button></Col>
                                <Col><Button type="submit" disabled={!(dirty && isValid)}>ยืนยัน</Button></Col>
                            </Row>
                        </> : null}
                        {/* <pre> {JSON.stringify(values.garden, null, 2)} </pre> */}
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default RegisterForm