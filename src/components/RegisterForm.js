import React, { Component } from 'react';
import { Col, Row, Button, Form, } from 'react-bootstrap';
import provinces from '../json/provinces';
import amphures from '../json/amphures';
import districts from '../json/districts';

export default class RegisterForm extends Component {

    state = {
        loading: false,
        province: '',
        amphure: '',
        district: '',
        provinceID: '',
        amphurID: '',
        
    }

    componentDidMount() {
        this.setState({
            province: provinces[0].province_name,
            amphure: amphures[0].amphur_name,
            district: districts[0].district_name,
            provinceID: provinces[0].province_id,
            amphurID: amphures[0].amphur_id,
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
        
    }
    
    handleChangeProvince = (event) => {
        const provinceName = event.target.value
        const p = provinces.find(province => province.province_name === provinceName)
        const a = amphures.find(amphur => amphur.province_id === p.province_id)
        const d = districts.find(district => district.amphur_id === a.amphur_id)
        this.setState({
            province: p.province_name,
            provinceID: p.province_id,
            amphure: a.amphur_name,
            amphurID: a.amphur_id,
            district: d.district_name
        })
    }

    handleChangeAmphur = (event) => {
        const amphurID = event.target.value
        const a = amphures.find(amphur => amphur.province_id === this.state.provinceID && amphur.amphur_id === amphurID)
        const d = districts.find(district => district.amphur_id === a.amphur_id)
        this.setState({
            amphure: a.amphur_name,
            amphurID: amphurID,
            district: d.district_name
        })
            
    }

    handleSubmit = (event) => {
        const { amphure, amphurID } = this.state
        console.log(amphure, amphurID)
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
        event.preventDefault()
    }


    render() {
        return (
            <div className='container'>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label for="name">ชื่อ</Form.Label>
                                <Form.Control name="name" id="name" placeholder="ชื่อจริง" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label for="surname">นามสกุล</Form.Label>
                                <Form.Control name="surname" id="surname" placeholder="นามสกุลจริง" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label for="citizenID">หมายเลขบัตรประชาชน</Form.Label>
                                <Form.Control  name="citizenID" id="citizenID" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label for="birthDate">วัน/เดือน/ปี เกิด</Form.Label>
                                <Form.Control type="date" name="password" id="examplePassword" placeholder="password placeholder"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label for="tel">โทรศัพท์มือถือ</Form.Label>
                                <Form.Control name="tel" id="tel" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label for="email">อีเมลล์</Form.Label>
                                <Form.Control type="email" name="email" id="email" placeholder="example@email.com"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                        <Form.Group>
                            <Form.Label for="address">ที่อยู่</Form.Label>
                            <Form.Control name="address" id="address" placeholder="บ้านเลขที่, หมู่, ซอย" />
                        </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group>
                            <Form.Label for="district">แขวง/ตำบล</Form.Label>
                            <Form.Control as="select" name="district" id="district" onChange={this.handleChange}>
                                {
                                    districts.map((data, index) => {
                                        if(this.state.amphurID === data.amphur_id){
                                            return <option key={index} value={data.district_name}>{data.district_name}</option>
                                        }
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label for="amphure">เขต/อำเภอ</Form.Label>
                                <Form.Control as="select" name="amphure" id="amphure" onChange={this.handleChangeAmphur}>
                                    {
                                        amphures.map((data, index) => {
                                            if(this.state.provinceID === data.province_id){
                                                return <option key={index} value={data.amphur_id}>{data.amphur_name}</option>
                                            }
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label for="province">จังหวัด</Form.Label>
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
                                    <Form.Label for="zip">รหัสไปรษณีย์</Form.Label>
                                    <Form.Control type="text" name="zip" id="zip"/>
                                </Form.Group>  
                            </Col>
                        </Row>
                    <Button onClick={this.handleSubmit}>ยืนยัน</Button>
                </Form>
            </div>
        )
    }
}
