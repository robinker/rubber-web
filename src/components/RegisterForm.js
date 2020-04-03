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
        console.log(user)
        console.log(gardens)
        // console.log(test)

        axios.post('http://localhost:5000/users/add', {
            user, gardens
        })
        .then(res => {
            if (res.data === 'User added!') {
                alert('บันทึกข้อมูลสำเร็จ')
            }
        })
        .catch(err => {
            alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
        })


        var paramsCreate = new URLSearchParams();
        paramsCreate.append('accountName', props.user.firstname + props.user.lastname);
             
        var paramShareToAdmin = new URLSearchParams();
        paramShareToAdmin.append('accountNameShared', props.user.firstname + props.user.lastname)
        paramShareToAdmin.append('shareTo', "O=Admin,L=Bangkok,C=TH")

        var paramShareToAgriculturist = new URLSearchParams();
        paramShareToAgriculturist.append('accountNameShared', props.user.firstname + props.user.lastname)
        paramShareToAgriculturist.append('shareTo', "O=Agriculturist,L=Bangkok,C=TH")
        
        var paramShareToMiddleman = new URLSearchParams();
        paramShareToMiddleman.append('accountNameShared', props.user.firstname + props.user.lastname)
        paramShareToMiddleman.append('shareTo', "O=Middleman,L=Bangkok,C=TH")

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
   
        if(props.match.params.role === 'เกษตรกร') {
            axios.post('http://13.76.35.161/api/middleman/blockchainTransaction/createNewAccount', paramsCreate, config)
            .then(res => {
                if (res.status === 'OK') {
                    alert('บันทึกข้อมูลสำเร็จ')
                    
                    axios.post('http://13.76.35.161/api/middleman/blockchainTransaction/shareAccount', paramShareToAdmin, config) 
                    .then(res => {
                        if (res.status === 'OK') {
                            alert('บันทึกข้อมูลสำเร็จ')
                        }
                    })
                    .catch(err => {
                        alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
                    }) 
                   
                    axios.post('http://13.76.35.161/api/middleman/blockchainTransaction/shareAccount', paramShareToAgriculturist, config) 
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
            axios.post('http://13.76.35.161/api/agriculturist/blockchainTransaction/createNewAccount', paramsCreate, config)
            .then(res => {
                if (res.status === 'OK') {
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
                    
                    axios.post('http://13.76.35.161/api/agriculturist/blockchainTransaction/shareAccount', paramShareToMiddleman, config) 
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