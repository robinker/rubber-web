import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col,  Form as FormB } from 'react-bootstrap'
import { Formik, Form , Field, getIn} from 'formik'
import { GardenSchema } from '../components/Schema'
// import provinces from '../json/provinces'

function Update(props) {

    const garden = useSelector(state => state.user.gardens[props.location.index])

    function isValid(name, touched){
        return getIn(touched, name) ? getIn(props.errors, name) ? 'is-invalid' : 'is-valid' : ''
    }

    function errorMessage(name, errors){
        return getIn(errors, name)
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
                    console.log(values)
                }}
            >
                {({ values, errors, touched, dirty }) => (
                    <Form>
                        <Row>
                            <Col>
                                <FormB.Group>
                                    <FormB.Label>เนื้อที่สวนยาง (ไร่)</FormB.Label>
                                    <Field type='number' name='area' id="area" placeholder="10" className={`form-control ${isValid(`area`, touched.area)}`} />
                                    <FormB.Control.Feedback type="invalid"> {errorMessage(`area`,errors.area)} </FormB.Control.Feedback>
                                </FormB.Group>
                            </Col>
                            <Col>
                                <FormB.Group>
                                    <FormB.Label>ปีที่ปลูก (พ.ศ.)</FormB.Label>
                                    <Field type='number' name='startYear' id="startYear" placeholder="2558" className={`form-control ${isValid(`startYear`, touched.startYear)}`} />
                                    <FormB.Control.Feedback type="invalid"> {errorMessage(`startYear`, errors.startYear)} </FormB.Control.Feedback>
                                </FormB.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormB.Group>
                                    <FormB.Label>ชื่อพันธุ์ต้นยาง</FormB.Label>
                                    <Field name='species' id="species" placeholder="RRIC 101"  className={`form-control ${isValid(`species`, touched.species)}`} />
                                    <FormB.Control.Feedback type="invalid"> {errorMessage(`species`, errors.species)} </FormB.Control.Feedback>
                                </FormB.Group>
                            </Col>
                            <Col>
                                <FormB.Group>
                                    <FormB.Label>จำนวนต้นยาง (ต้น)</FormB.Label>
                                    <Field name='amount' id="amount" placeholder="200" className={`form-control ${isValid(`amount`, touched.amount)}`} />
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