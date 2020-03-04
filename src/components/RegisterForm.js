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
        let payload = {
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
        let garden
        if(props.match.params.role === 'เกษตรกร') {
            const productList = []
            products.map(product => {
                if(product.checked){
                    productList.push(product.name)
                }
                return productList
            })
            garden = {
                area: values.area,
                startYear: values.startYear,
                species: values.species,
                amount: values.amount,
                products: productList
            }
        }
        else if(props.match.params.role === 'พ่อค้าคนกลาง') {
            payload = {
                ...payload,
                cert_1: values.cert,
            }
        }
        console.log(payload)
        console.log(garden)
        axios.post('http://localhost:5000/users/add', {
            payload, garden
        })
        .then(res => {
            if (res.data === 'User added!') {
                alert('บันทึกข้อมูลสำเร็จ')
            }
        })
        .catch(err => {
            alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
        })
    }

    const [products, setProducts] = useState([
        {name:'น้ำยางสด', checked: true}, 
        {name:'ยางก้อนถ้วย', checked: false}, 
        {name:'ยางแผ่นดิบ', checked: false}, 
        {name:'ยางแผ่นรมควัน', checked: false}, 
        {name:'ขี้ยาง', checked: false}, 
        {name:'ยางเครฟ', checked: false},
    ])

    function handleCheck(event) {
        setProducts(products.map((product) => {
            if(product.name === event.target.value){
                product.checked = event.target.checked
            }
            return product
        }))
    }

    const [page, setPage] = useState(1)
    function nextForm() {
        setPage(page => page + 1)
    }

    function previousForm(){
        setPage(page => page - 1)
    }

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item active={page===1} onClick={() => setPage(1)}>ข้อมูลผู้ใช้</Breadcrumb.Item>
                {   props.match.params.role === 'เกษตรกร' ? 
                    <Breadcrumb.Item active={page===2} onClick={() => setPage(2)}> ข้อมูลสวนยาง </Breadcrumb.Item> : null }
                <Breadcrumb.Item active={page===3} onClick={() => setPage(3)}> บัญชีผู้ใช้ </Breadcrumb.Item>
            </Breadcrumb>
            <Formik validationSchema={ props.match.params.role === 'ผู้ดูแลระบบ' ? RegisterSchema : props.match.params.role === 'เกษตรกร' ? GardenerSchema : MiddlemanSchema}
                initialValues={{ //กำหนด initialValues
                    birthdate: new Date(),
                    province: provinces[0].province_name,
                    garden: [{ }]
                }}
                onSubmit={values => { //  send data to backend
                    onSubmit(values)
                }}>
                {({ values, errors, touched}) => (
                    <Form>
                        {page === 1 ? <UserForm errors={errors} touched={touched} role={props.match.params.role} next={nextForm}></UserForm> : null }

                        {
                            props.match.params.role === 'เกษตรกร' && page===2 ? 
                            <FieldArray name='garden'>
                                { 
                                    ({push}) => (
                                    <>
                                    {
                                        values.garden.map((g, index) => {
                                            return (
                                                <GardenForm errors={errors} touched={touched} handleCheck={handleCheck} index={index} push={push} key={index}/>
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
                        {/* <pre>{JSON.stringify(values,null,2)} </pre> */}

                        {page === 3 ? <AccountForm errors={errors} touched={touched} role={props.match.params.role} next={nextForm} back={previousForm}></AccountForm> : null}
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default RegisterForm