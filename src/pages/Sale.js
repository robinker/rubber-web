import React, { Component } from 'react'
import {Form, Col, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

export default class Sale extends Component {
    state = {
        rubberType: 'น้ำยางสด',
        volume: 0,
        price: 0,
        volumeError: '',
        priceError: '',
        destError: '',
        validate: false,
        destination: '',
        
    }

    handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value  
        this.setState({
            [event.target.name] : value,
        })
    }

    validate = () => {
        let volumeError = ''
        let priceError = ''
        let destError = ''

        if(this.state.volume <= 0){
            volumeError = 'ปริมาณผิดพลาด'
        }

        if(this.state.price <= 0){
            priceError = 'จำนวนเงินผิดพลาด'
        }

        if(this.state.destination === ''){
            destError = 'กรุณากรอกชื่อผู้ซื้อ'
        }

        if(volumeError || priceError || destError){
            this.setState({
                volumeError,
                priceError,
                destError
            })
            return false
        }

        return true
    }

    handleSubmit = (event) => {
        const validate = this.validate()

        if (!validate) {
            event.preventDefault()
            event.stopPropagation()
        }

        else {
            this.setState({ validate: true })
            axios.post('http://localhost:5000/sale/add',{
                source: this.props.source,
                rubberType: this.state.rubberType,
                volume: this.state.volume,
                price: this.state.price,
                destination: this.state.destination
            })
            .then(res => {
                if(res.data === 'Transaction added!'){
                    alert('บันทึกข้อมูลสำเร็จ')
                    this.setState({
                        volumeError: '',
                        priceError: '',
                    })
                }
            })
            .catch(err => {
                alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
            })
        }
        
    }

    render() {

        return (
            <div className='container'>
                <Form>
                    <Form.Group as={Col}>
                        <h2>แจ้งราคาขายยาง</h2>
                        <br></br>
                        <Form.Label>รหัสการซื้อขาย :</Form.Label>
                        <br></br>
                        <Form.Label>ประเภทยาง : {this.state.rubberType} {this.state.others}</Form.Label>
                        <Form inline>
                            <Form.Check inline type="radio" name='rubberType' value='น้ำยางสด' label="น้ำยางสด"  checked={this.handleCheck} onChange={this.handleChange} defaultChecked/>
                            <Form.Check inline type="radio" name='rubberType' value='ยางก้อนถ้วย' label="ยางก้อนถ้วย" checked={this.handleCheck} onChange={this.handleChange}/>
                            <Form.Check inline type="radio" name='rubberType' value='ยางแผ่นดิบ' label="ยางแผ่นดิบ" checked={this.handleCheck} onChange={this.handleChange}/>
                            <Form.Check inline type="radio" name='rubberType' value='ผางแผ่นรบควัน' label="ผางแผ่นรบควัน" checked={this.handleCheck} onChange={this.handleChange}/>
                            <Form.Check inline type="radio" name='rubberType' value='ขี้ยาง/เศษยาง' label="ขี้ยาง/เศษยาง" checked={this.handleCheck} onChange={this.handleChange}/>
                            <Form.Check inline type="radio" name='rubberType' value='ยางเครฟ' label="ยางเครฟ" checked={this.handleCheck} onChange={this.handleChange}/>
                        </Form>
                    </Form.Group>
                    <Form.Group as={Col} sm='5'>
                        <Form.Label>ปริมาณยางที่ขาย (กิโลกรัม)</Form.Label>
                        { this.state.volumeError ? 
                            (<Form.Control type='number' name='volume' onChange={this.handleChange} isInvalid></Form.Control>) :
                            (<Form.Control type='number' name='volume' onChange={this.handleChange}></Form.Control>) 
                        }
                        
                        <Form.Control.Feedback type='invalid'> {this.state.volumeError} </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm='5'>
                        <Form.Label>ราคายางที่ขาย (บาท)</Form.Label>
                        { this.state.priceError ? 
                            (<Form.Control type='number' name='price' onChange={this.handleChange} isInvalid></Form.Control>) :
                            (<Form.Control type='number' name='price' onChange={this.handleChange}></Form.Control>)
                        }
                        <Form.Control.Feedback type='invalid'> {this.state.priceError} </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm='5'>
                        <Form.Label>ชื่อผู้ซื้อ (ชื่อ-นามสกุล)</Form.Label>
                        { this.state.destError ? 
                            (<Form.Control name='destination' onChange={this.handleChange} isInvalid></Form.Control>) :
                            (<Form.Control name='destination' onChange={this.handleChange} placeholder="กอไก่ ใจดี"></Form.Control>)
                        }
                        <Form.Control.Feedback type='invalid'> {this.state.destError} </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <br></br>
                        <Button onClick={this.handleSubmit}>ยืนยัน</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}
