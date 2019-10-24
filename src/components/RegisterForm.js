import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
                        <FormGroup>
                            <Label for="name">ชื่อ</Label>
                            <Input name="name" id="name" placeholder="ชื่อจริง" />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="surname">นามสกุล</Label>
                            <Input name="surname" id="surname" placeholder="นามสกุลจริง" />
                        </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="citizenID">หมายเลขบัตรประชาชน</Label>
                            <Input name="citizenID" id="citizenID" placeholder="" />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="birthDate">วัน/เดือน/ปี เกิด</Label>
                            <Input type="date" name="password" id="examplePassword" placeholder="password placeholder"/>
                        </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="tel">โทรศัพท์มือถือ</Label>
                            <Input name="tel" id="tel" placeholder="" />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="email">อีเมลล์</Label>
                            <Input type="email" name="email" id="email" placeholder="example@email.com"/>
                        </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="address">ที่อยู่</Label>
                            <Input name="address" id="address" placeholder="บ้านเลขที่, หมู่, ซอย" />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="district">แขวง/ตำบล</Label>
                            <Input type="select" name="district" id="district" onChange={this.handleChange}>
                                {
                                    districts.map((data, index) => {
                                        if(this.state.amphurID === data.amphur_id){
                                            return <option key={index} value={data.district_name}>{data.district_name}</option>
                                        }
                                    })
                                }
                            </Input>
                        </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="amphure">เขต/อำเภอ</Label>
                            <Input type="select" name="amphure" id="amphure" onChange={this.handleChangeAmphur}>
                                {
                                    amphures.map((data, index) => {
                                        if(this.state.provinceID === data.province_id){
                                            return <option key={index} value={data.amphur_id}>{data.amphur_name}</option>
                                        }
                                    })
                                }
                            </Input>
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="province">จังหวัด</Label>
                            <Input type="select" name="province" id="province" onChange={this.handleChangeProvince}>
                                {
                                    provinces.map((data, index) => {
                                        return <option key={index} value={data.province_name}>{data.province_name}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                        </Col>
                        <FormGroup>
                            <Label for="zip">รหัสไปรษณีย์</Label>
                            <Input type="text" name="zip" id="zip"/>
                        </FormGroup>  
                    </Row>
                    <Button onClick={this.handleSubmit}>ยืนยัน</Button>
                </Form>
            </div>
        )
    }
}
