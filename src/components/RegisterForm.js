import React from 'react'
import { Button, Form } from 'react-bootstrap'
import UserForm from './UserForm'
import GardenForm from './GardenForm'
import provinces from '../json/provinces'
import { Formik, Form as FormIK, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const RegisterSchema = Yup.object({
    firstname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('กรุณากรอกชื่อ'),
    lastname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('กรุณากรอกนามสกุล'),  
    citizenID: Yup.string()
        .length(13, 'หมายเลขบัตรประชาชนไม่ถูกต้อง')
        .required('กรุณากรอกหมายเลขบัตรประชาชน')
        .test('', 'กรุณาใส่ตัวเลข', function(value) {
            //check citizenId pattern
            return /\d+/.test(value)
        }),
    birthdate: Yup.date()
        .default(() => new Date())  
        .max(new Date(), 'date errors'),
    tel: Yup.string()
        .length(10, 'หมายเลขโทรศัพท์ไม่ถูกต้อง')
        .test('', '', function(value) {
            //check citizenId pattern
            return /\d+/.test(value)
        }),
    email: Yup.string()
        .email('อีเมลล์ไม่ถูกต้อง')
        .required('กรุณากรอกอีเมลล์'),
    address: Yup.string()
        .required('กรุณากรอกที่อยู่'),
    district: Yup.string()
        .required('กรุณากรอกแขวง/ตำบล'),
    amphure: Yup.string()
        .required('กรุณากรอกเขต/อำเภอ'),
    zipcode: Yup.string()
        .length(5, 'รหัสไปรษณีย์ไม่ถูกต้อง')
        .required('กรุณากรอกรหัสไปรษณีย์')
        .test('', 'กรุณาใส่ตัวเลข', function(value) {
            //check citizenId pattern
            return /\d+/.test(value)
        }),
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

const MiddlemanSchema = RegisterSchema.shape({
    cert_1: Yup.number()
})

const GardenerSchema = MiddlemanSchema.shape({
    area: Yup.number()
        .positive('เนื้อที่ไม่ถูกต้อง')
        .moreThan(0, 'เลขติดลบ')
        .required('กรุณากรอกเนื้อที่สวนยาง'),
    startYear: Yup.number()
        .positive('ปีไม่ถูกต้อง')
        .min((new Date().getUTCFullYear() + 543 - 50), 'ปีไม่ถูกต้อง')
        .max((new Date().getUTCFullYear() + 543), 'ปีไม่ถูกต้อง')
        .required('กรุณากรอกปีที่ปลูก'),
    species: Yup.string()
        .required('กรุณากรอกชื่อพันธุ์ยาง'),
    amount: Yup.number()
        .moreThan(0, 'เท่าไรดี')
        .required('กรุณากรอกจำนวนต้นยาง')
})



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
            garden = {
                area: values.area,
                startYear: values.startYear,
                species: values.species,
                amount: values.amount
            }
        }
        else if(props.match.params.role === 'พ่อค้าคนกลาง') {
            payload = {
                ...payload,
                cert_1: values.cert,
            }
        }
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

    return (
        <div className='container'>
            <h2>ข้อมูลสมาชิก</h2>
            <br></br>
            <Formik validationSchema={ props.match.params.role === 'ผู้ดูแลระบบ' ? RegisterSchema : props.match.params.role === 'เกษตรกร' ? GardenerSchema : MiddlemanSchema}
                initialValues={{ //กำหนด initialValues
                    birthdate: new Date(),
                    province: provinces[0].province_name,
                }}
                onSubmit={values => {
                    //  send data to backend
                    onSubmit(values)
                }}>
                {({ errors, touched}) => (
                    <FormIK>
                        <UserForm errors={errors} touched={touched}></UserForm>
                        <hr></hr>
                        {props.match.params.role === 'เกษตรกร' ? <GardenForm errors={errors} touched={touched}/> : null }
                        <h2>บัญชีผู้ใช้</h2>
                        <br></br>
                        <Form.Group>
                            <Form.Label>ชื่อบัญชีผู้ใช้ :</Form.Label>
                            <Field type="username" name="username" id="username" className={`form-control ${touched.username ? errors.username ? 'is-invalid' : 'is-valid' : ''}`}/>
                            <Form.Control.Feedback type="invalid"> {errors.username} </Form.Control.Feedback>
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

export default RegisterForm