import React from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { Field, getIn } from 'formik'
import provinces from '../json/provinces'

function GardenForm(props) {
    
    function errorMessage(name){
        return getIn(props.errors, name)
    }

    function isValid(name){
        return getIn(props.touched, name) ? getIn(props.errors, name) ? 'is-invalid' : 'is-valid' : ''
    }

    return (
        <>
            <h2>ข้อมูลสวนยาง</h2>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>เนื้อที่สวนยาง (ไร่)</Form.Label>
                        <Field type='number' name={`garden[${props.index}].area`} id="area" placeholder="10" className={`form-control ${isValid(`garden[${props.index}].area`)}`} />
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].area`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>ปีที่ปลูก (พ.ศ.)</Form.Label>
                        <Field type='number' name={`garden[${props.index}].startYear`} id="startYear" placeholder="2558" className={`form-control ${isValid(`garden[${props.index}].startYear`)}`} />
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].startYear`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>ชื่อพันธุ์ต้นยาง</Form.Label>
                        <Field name={`garden[${props.index}].species`} id="species" placeholder="RRIC 101"  className={`form-control ${isValid(`garden[${props.index}].species`)}`} />
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].species`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>จำนวนต้นยาง (ต้น)</Form.Label>
                        <Field name={`garden[${props.index}].amount`} id="amount" placeholder="200" className={`form-control ${isValid(`garden[${props.index}].amount`)}`} />
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].amount`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>ที่อยู่</Form.Label>
                        <Field name={`garden[${props.index}].address`} id="address" placeholder="บ้านเลขที่ หมู่ ซอย" className={`form-control ${isValid(`garden[${props.index}].address`)}`}/>
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].address`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>แขวง/ตำบล</Form.Label>
                        <Field name={`garden[${props.index}].district`} id="district" className={`form-control ${isValid(`garden[${props.index}].district`)}`}/>
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].district`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>เขต/อำเภอ</Form.Label>
                        <Field name={`garden[${props.index}].amphure`} id="amphure" className={`form-control ${isValid(`garden[${props.index}].amphure`)}`}/>
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].amphure`)} </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>จังหวัด</Form.Label>
                        <Field as="select" className="form-control" name={`garden[${props.index}].province`} id="province">
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
                        <Field name={`garden[${props.index}].zipcode`} id="zipcode" className={`form-control ${isValid(`garden[${props.index}].zipcode`)}`}/>
                        <Form.Control.Feedback type="invalid"> {errorMessage(`garden[${props.index}].zipcode`)} </Form.Control.Feedback>
                    </Form.Group>  
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>รูปแบบการผลิต :</Form.Label>
                        <br></br>
                        <Field name={`garden[${props.index}].products`} options={['น้ำยางสด', 'ยางก้อนถ้วย', 'ยางแผ่นดิบ', 'ยางแผ่นรมควัน', 'ขี้ยาง/เศษยาง', 'ยางเครฟ']} component={CheckboxGroup} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col><Button onClick={() => props.arrayHelpers.push({
                            area: "",
                            startYear: "",
                            species: "",
                            amount: "",
                            address: "",
                            district: "",
                            amphure: "",
                            province: provinces[0].province_name,
                            zipcode: "",
                            products: ['น้ำยางสด']})}>เพิ่ม</Button></Col>
                {props.index > 0 ? <Col><Button onClick={() => props.arrayHelpers.remove(props.index)} >ลบ</Button></Col> : null}
            </Row>
            <hr/>
        </>
    )
}

export default GardenForm

function CheckboxGroup(props) {
    
    const value = props.field.value
    const options = props.options
    
    function handleOnChange(value, checked) {
        const setFieldValue = props.form.setFieldValue
        const field = props.field

        if(checked) {
            setFieldValue(field.name, field.value.filter(p => p !== value))
        } else {
            setFieldValue(field.name, [...field.value, value])
        }
    }

    return (
      <>
        {options.map(option =>{ 
            const checked = value.includes(option)
            return (
                <Form.Check inline type="checkbox" key={option} name='products' value={option} label={option} 
                checked={checked} 
                onChange={() => handleOnChange(option, checked)}/>
            )})
        }
      </>
    );
}