import React from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import provinces from '../json/provinces'
import { Formik, Form as FormIK, Field } from 'formik'
import * as Yup from 'yup'

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

const GardenerSchema = RegisterSchema.shape({
    area: Yup.number()
        .positive('เนื้อที่ไม่ถูกต้อง')
        .moreThan(0, 'เลขติดลบ')
        .required('กรุณากรอกเนื้อที่สวนยาง')
    ,
    startYear: Yup.number()
        .positive('ปีไม่ถูกต้อง')
        .min((new Date().getUTCFullYear() + 543 - 50), 'เว่อๆๆๆ')
        .max((new Date().getUTCFullYear() + 543), 'เจ้าของสวนยางผู้มาก่อนกาล ?')
        .required('กรุณากรอกปีที่ปลูก')
})

function RegisterForm(props) {

    return (
        <div className='container'>
            <h2>ข้อมูลสมาชิก</h2>
            <br></br>
            <Formik validationSchema={props.match.params.role === 'เจ้าของสวนยาง' ? GardenerSchema : RegisterSchema}
                initialValues={{ //กำหนด initialValues
                    birthdate: new Date(),
                    province: provinces[0].province_name,
                }}
                onSubmit={values => {
                    //  send data to backend
                    console.log(values);
                }}>
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
                                    <Field type="date" name="birthdate" id="birthdate" className={`form-control ${touched.birthdate ? errors.birthdate ? 'is-invalid' : 'is-valid' : ''}`} />
                                    <Form.Control.Feedback type="invalid"> {errors.birthdate === 'date errors' ? 'ข้อมูลไม่ถูกต้อง' : 'กรุณาใส่วัน/เดือน/ปี เกิด'} </Form.Control.Feedback>
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
                            <Col md={3}> 
                                <Form.Group>
                                    <Form.Label>รหัสไปรษณีย์</Form.Label>
                                    <Field name="zipcode" id="zipcode" className={`form-control ${touched.zipcode ? errors.zipcode ? 'is-invalid' : 'is-valid' : ''}`}/>
                                    <Form.Control.Feedback type="invalid"> {errors.zipcode} </Form.Control.Feedback>
                                </Form.Group>  
                            </Col>
                        </Row>
                        <hr></hr>
                        {props.match.params.role === 'เจ้าของสวนยาง' ?
                            <>
                            <h2>ข้อมูลสวนยาง</h2>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>เนื้อที่สวนยาง (ไร่)</Form.Label>
                                            <Field type='number' name="area" id="area" placeholder="10"  className={`form-control ${touched.area ? errors.area ? 'is-invalid' : 'is-valid' : ''}`} />
                                            <Form.Control.Feedback type="invalid"> {errors.area} </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>ปีที่ปลูก (พ.ศ.)</Form.Label>
                                            <Field type='number' name="startYear" id="startYear" placeholder="2558" className={`form-control ${touched.startYear ? errors.startYear ? 'is-invalid' : 'is-valid' : ''}`} />
                                            <Form.Control.Feedback type="invalid"> {errors.startYear} </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>ชื่อพันธุ์ต้นยาง</Form.Label>
                                            <Field name="species" id="species" placeholder="RRIC 101"  className={`form-control ${touched.firstname ? errors.firstname ? 'is-invalid' : 'is-valid' : ''}`} />
                                            <Form.Control.Feedback type="invalid"> {errors.firstname} </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>จำนวนต้นยาง (ต้น)</Form.Label>
                                            <Field name="amount" id="amount" placeholder="200" className={`form-control ${touched.lastname ? errors.lastname ? 'is-invalid' : 'is-valid' : ''}`} />
                                            <Form.Control.Feedback type="invalid"> {errors.lastname} </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </>: null
                        }
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
