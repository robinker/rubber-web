import React, { Component } from 'react'
import {Form, Col, Button, InputGroup } from 'react-bootstrap'
import AddFreind from '../components/AddFriend'
import axios from 'axios'

class Sale extends Component {
    state = {
        rubberType: 'น้ำยางสด',
        volume: 0,
        price: 0,
        volumeError: '',
        priceError: '',
        validate: false,
        destination: '',
        friendlist: [],
        
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

        // if(this.state.destination === ''){
        //     destError = 'กรุณากรอกชื่อผู้ซื้อ'
        // }

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
            axios.post('https://rubber-backend.herokuapp.com/sale/add',{
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

    componentDidMount = () => {
        axios.get('https://rubber-backend.herokuapp.com/users/getFriends/' + this.props.userId)
            .then(res => {
                let list = [...res.data]
                this.setState({
                    friendlist: list,
                    destination: list[list.length-1],
                })
            }).catch(err => {
                console.log('Error: ', err)
            })
    }

    componentDidUpdate = () => {
        axios.get('https://rubber-backend.herokuapp.com/users/getFriends/' + this.props.userId)
            .then(res => {
                let list = [...res.data]
                if(list.length !== this.state.friendlist.length){
                    this.setState({
                        friendlist: list,
                        destination: list[list.length-1]
                    })
                } else {
                    this.setState({
                        friendlist: list,
                    })  
                }
            }).catch(err => {
                console.log('Error: ', err)
            })
    }

    render() {

        return (
            <div className='container'>
                <Form.Group as={Col}>
                    <h2>ซื้อ-ขายยาง</h2>
                    <br></br>
                    {/* <Form.Label>รหัสการซื้อขาย :</Form.Label> */}
                    {/* <br></br> */}
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
                <Form.Label> ราคาสุทธิของยางที่ขาย (บาท) </Form.Label>
                    { this.state.priceError ? 
                        (<Form.Control type='number' name='price' onChange={this.handleChange} isInvalid></Form.Control>) :
                        (<Form.Control type='number' name='price' onChange={this.handleChange}></Form.Control>)
                    }
                    <Form.Control.Feedback type='invalid'> {this.state.priceError} </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} sm='5'>
                    <Form.Label>ชื่อผู้ซื้อ (ชื่อ-นามสกุล)</Form.Label>
                    <InputGroup>
                        <Form.Control as='select' name='destination' onChange={this.handleChange} >
                            {
                                this.state.friendlist.map((friend, index) => {
                                    return <option key={index} value={friend} selected> {friend} </option>
                                })
                            }
                        </Form.Control>
                        <InputGroup.Append>
                            <AddFreind userId={this.props.userId}></AddFreind>
                        </InputGroup.Append>
                    </InputGroup>
                    <Form.Control.Feedback type='invalid'> {this.state.destError} </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col}>
                    <br></br>
                    <Button onClick={this.handleSubmit}>ยืนยัน</Button>
                </Form.Group>
            </div>
        )
    }
}

export default Sale