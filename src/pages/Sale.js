import React, { Component } from 'react'
import {Form, Row, Col, Button } from 'react-bootstrap'
export default class Sale extends Component {
    state = {
        rubberType: 'น้ำยางสด',
        others: '',
        volume: 0,
        price: 0,
        volumeError: '',
        priceError: '',
        validate: false,
        
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

        if(this.state.volume <= 0){
            volumeError = 'ปริมาณผิดพลาด'
        }

        if(this.state.price <= 0){
            priceError = 'จำนวนเงินผิดพลาด'
        }

        if(volumeError || priceError){
            this.setState({
                volumeError,
                priceError
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
            this.setState({
                validate: true
            })
            console.log('submit: ' + this.state.price + this.state.volume)
        }
        
    }

    render() {

        return (
            <div className='container'>
                <h1>แจ้งราคาขายยาง</h1>
                <h3>รหัสการซื้อขาย :</h3>
                <h3>ประเภทยาง : {this.state.rubberType} {this.state.others}</h3>
                <Form inline>
                    <Form.Check inline type="radio" name='rubberType' value='น้ำยางสด' label="น้ำยางสด"  checked={this.handleCheck} onChange={this.handleChange} defaultChecked/>
                    <Form.Check inline type="radio" name='rubberType' value='ยางก้อนถ้วย' label="ยางก้อนถ้วย" checked={this.handleCheck} onChange={this.handleChange}/>
                    <Form.Check inline type="radio" name='rubberType' value='ยางแผ่นดิบ' label="ยางแผ่นดิบ" checked={this.handleCheck} onChange={this.handleChange}/>
                    <Form.Check inline type="radio" name='rubberType' value='ผางแผ่นรบควัน' label="ผางแผ่นรบควัน" checked={this.handleCheck} onChange={this.handleChange}/>
                    <Form.Check inline type="radio" name='rubberType' value='อื่นๆ' label="อื่นๆ" checked={this.handleCheck} onChange={this.handleChange}/>
                    <Form.Control hidden={this.state.rubberType !== 'อื่นๆ'} name='others' onChange={this.handleChange}></Form.Control>
                </Form>
                <hr></hr>
                <Form>
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
                </Form>
                <Button onClick={this.handleSubmit}>ยืนยัน</Button>
            </div>
        )
    }
}
