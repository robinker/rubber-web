import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row, Col,  Form as FormB, Button } from 'react-bootstrap'
import { Formik, Form , Field, getIn} from 'formik'
import { GardenSchema } from '../components/Schema'
import { update } from '../actions'
import axios from 'axios'

function Update(props) {

    const garden = props.location.garden
    const dispatch = useDispatch()

    function is_valid(name, touched){
        return getIn(touched, name) ? getIn(props.errors, name) ? 'is-invalid' : 'is-valid' : ''
    }

    function errorMessage(name, errors){
        return getIn(errors, name)
    }
    
    function submit(data){
        axios.post(`http://rubber-backend.herokuapp.com/gardens/update/${garden._id}`, {
            garden: data
        }).then(res => {
            if(res.data.message === "Garden Updated!"){
                dispatch(update(res.data.garden, props.location.index))
                alert('อัพเดทข้อมูลสำเร็จ')
            } else {
                alert('อัพเดทข้อมูลไม่สำเร็จ')
            }
        }).catch(error => {
            alert('อัพเดทข้อมูลไม่สำเร็จ')
            console.log(error)
        })
    }

    return (
        <Container>
            <h2>สวนที่ {props.location.index + 1}</h2>
            <Formik validationSchema={ GardenSchema }
                initialValues={{
                    area: garden.area,
                    startYear: garden.startYear,
                    species: garden.species,
                    amount: garden.amount,
                    // address: "",
                    // subdistrict: "",
                    // district: "",
                    // province: provinces[0].province_name,
                    // zipcode: "",
                    products: [...garden.products]
                }}
                onSubmit={values => {
                    submit(values)
                }}
            >
                {({ errors, touched, dirty, isValid }) => (
                    <Form>
                        <Row>
                            <Col>
                                <FormB.Group>
                                    <FormB.Label>เนื้อที่สวนยาง (ไร่)</FormB.Label>
                                    <Field type='number' name='area' id="area" placeholder="10" className={`form-control ${is_valid(`area`, touched.area)}`} />
                                    <FormB.Control.Feedback type="invalid"> {errorMessage(`area`,errors.area)} </FormB.Control.Feedback>
                                </FormB.Group>
                            </Col>
                            <Col>
                                <FormB.Group>
                                    <FormB.Label>ปีที่ปลูก (พ.ศ.)</FormB.Label>
                                    <Field type='number' name='startYear' id="startYear" placeholder="2558" className={`form-control ${is_valid(`startYear`, touched.startYear)}`} />
                                    <FormB.Control.Feedback type="invalid"> {errorMessage(`startYear`, errors.startYear)} </FormB.Control.Feedback>
                                </FormB.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormB.Group>
                                    <FormB.Label>ชื่อพันธุ์ต้นยาง</FormB.Label>
                                    <Field name='species' id="species" placeholder="RRIC 101"  className={`form-control ${is_valid(`species`, touched.species)}`} />
                                    <FormB.Control.Feedback type="invalid"> {errorMessage(`species`, errors.species)} </FormB.Control.Feedback>
                                </FormB.Group>
                            </Col>
                            <Col>
                                <FormB.Group>
                                    <FormB.Label>จำนวนต้นยาง (ต้น)</FormB.Label>
                                    <Field name='amount' id="amount" placeholder="200" className={`form-control ${is_valid(`amount`, touched.amount)}`} />
                                    <FormB.Control.Feedback type="invalid"> {errorMessage(`amount`, errors.amount)} </FormB.Control.Feedback>
                                </FormB.Group>
                            </Col>
                        </Row>
                        <Row>
                            <FormB.Group>
                                <Col> <FormB.Label> รูปแบบการผลิต : </FormB.Label></Col>
                                <Col><Field name='products' options={['น้ำยางสด', 'ยางก้อนถ้วย', 'ยางแผ่นดิบ', 'ยางแผ่นรมควัน', 'ขี้ยาง/เศษยาง', 'ยางเครฟ']} component={CheckboxGroup} /></Col>
                            </FormB.Group>
                        </Row>
                        <Button type='submit' disabled={!(dirty && isValid)}>ยืนยัน </Button>
                    </Form>
                )}  
            </Formik>
        </Container>
    )
}

export default Update

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
                <FormB.Check inline type="checkbox" key={option} name='products' value={option} label={option} 
                checked={checked} 
                onChange={() => handleOnChange(option, checked)}/>
            )})
        }
      </>
    );
}