import React, { useState } from 'react'
import { Breadcrumb, Container, Row, Col, Button } from 'react-bootstrap'
import UserForm from './UserForm'
import GardenForm from './GardenForm'
import AccountForm from './AccountForm'
import provinces from '../json/provinces'
import { Formik, Form, FieldArray } from 'formik'
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
            amphure: values.amphure,
            district: values.district,
            province: values.province,
            zipcode: values.zipcode,
            username: values.username,
            password: values.password,
            role: props.match.params.role
        }

        let garden = {}
        if(props.match.params.role === 'เกษตรกร') {
            user = {
                ...user,
                cert_1: values.cert
            }
            garden = values.garden
        }
        else if(props.match.params.role === 'พ่อค้าคนกลาง') {
            user = {
                ...user,
                cert_1: values.cert
            }
        }
        console.log(user)
        console.log(garden)
        // console.log(test)
        // axios.post('http://localhost:5000/users/add', {
        //     user, garden
        // })
        // .then(res => {
        //     if (res.data === 'User added!') {
        //         alert('บันทึกข้อมูลสำเร็จ')
        //     }
        // })
        // .catch(err => {
        //     alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
        // })
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
                    district: "",
                    amphure: "",
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
                            district: "",
                            amphure: "",
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

                        {page === 3 ? <AccountForm errors={errors} touched={touched} role={props.match.params.role} 
                        next={nextForm} back={previousForm} isValid={dirty && isValid}></AccountForm> : null}
                        {/* <pre> {JSON.stringify(values.garden, null, 2)} </pre> */}
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default RegisterForm