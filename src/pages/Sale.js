import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Col, Button, InputGroup } from 'react-bootstrap'
import AddFreind from '../components/AddFriend'
import axios from 'axios'

function Sale(props) {
    const [state, setState] = useState({
        rubberType: 'น้ำยางสด',
        volume: 0,
        price: 0,
        volumeError: '',
        priceError: '',
        destination: '',
        friendlist: []
    })
    
    const user = useSelector(state => state.user)
    // to make useEffect work when add friend
    const friends = useSelector(state => state.friends)
    
    function handleChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setState({ ...state, [event.target.name]: value })
    }

    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        axios.get('https://rubber-backend.herokuapp.com/users/getFriends/' + props.userId, {
            headers: {
                "Authorization": "Bearer " + user.token
            }, 
            cancelToken: source.token
        })
        .then(res => {
            let list = [...res.data]
            setState(state => ({ ...state, friendlist: list, destination: list[list.length - 1] }))
        }).catch(err => {
            console.log('Error: ', err)
        })
        return () => {
            source.cancel()
        }
    }, [friends, props, user.token])

    function checkValidate() {
        let volumeError = ''
        let priceError = ''

        if (state.volume <= 0) {
            volumeError = 'ปริมาณผิดพลาด'
        }

        if (state.price <= 0) {
            priceError = 'จำนวนเงินผิดพลาด'
        }

        if (volumeError || priceError) {
            setState({
                ...state,
                volumeError,
                priceError,
            })
            return false
        }

        return true
    }

    function handleSubmit(event) {
        const validate = checkValidate()
        if (!validate) {
            event.preventDefault()
            event.stopPropagation()
        }

        else {
            axios.post('https://rubber-backend.herokuapp.com/transactions/add', {
                source: {
                    name: props.source,
                    certification: user.cert
                },
                rubberType: state.rubberType,
                volume: state.volume,
                price: state.price,
                destination: state.destination
            })
            .then(res => {
                if (res.data === 'Transaction added!') {
                    alert('บันทึกข้อมูลสำเร็จ')
                    setState({
                        ...state,
                        volumeError: '',
                        priceError: '',
                    })
                    var params = new URLSearchParams();
                    params.append('source', props.source);
                    params.append('rubberType', state.rubberType);
                    params.append('volume', state.volume);
                    params.append('price', state.price);
                    params.append('destination', state.destination);

                    const config = {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        }
                      }
                    axios.post('http://13.76.35.161/api/middleman/blockchainTransaction/addRecordToTransaction', {params}, { withCredentials: true }, config)
                    .then(res => {
                        if (res === 'Add Record successfully.') {
                            alert('บันทึกข้อมูลสำเร็จ')
                        }
                    })
                    .catch(err => {
                        alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
                    }) 
                        
                }
            })
            .catch(err => {
                alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
            })
        }
    }

    return (
        <div className='container'>
            <Form.Group as={Col}>
                {props.role === 'เกษตรกร' ? <h2>ขายยาง</h2> : <h2>ซื้อยาง</h2>}
                <br></br>
                {/* <Form.Label>รหัสการซื้อขาย :</Form.Label> */}
                {/* <br></br> */}
                <Form.Label>ประเภทยาง : {state.rubberType}</Form.Label>
                <Form inline>
                    <Form.Check inline type="radio" name='rubberType' value='น้ำยางสด' label="น้ำยางสด" onChange={handleChange} defaultChecked />
                    <Form.Check inline type="radio" name='rubberType' value='ยางก้อนถ้วย' label="ยางก้อนถ้วย" onChange={handleChange} />
                    <Form.Check inline type="radio" name='rubberType' value='ยางแผ่นดิบ' label="ยางแผ่นดิบ" onChange={handleChange} />
                    <Form.Check inline type="radio" name='rubberType' value='ยางแผ่นรมควัน' label="ยางแผ่นรมควัน" onChange={handleChange} />
                    <Form.Check inline type="radio" name='rubberType' value='ขี้ยาง/เศษยาง' label="ขี้ยาง/เศษยาง" onChange={handleChange} />
                    <Form.Check inline type="radio" name='rubberType' value='ยางเครฟ' label="ยางเครฟ" onChange={handleChange} />
                </Form>
            </Form.Group>
            <Form.Group as={Col} sm='5'>
                {user.role === 'เกษตรกร' ? <Form.Label>ปริมาณยางที่ขาย (กิโลกรัม)</Form.Label> : <Form.Label>ปริมาณยางที่ซื้อ (กิโลกรัม)</Form.Label>}
                {state.volumeError ?
                    (<Form.Control type='number' name='volume' onChange={handleChange} isInvalid></Form.Control>) :
                    (<Form.Control type='number' name='volume' onChange={handleChange}></Form.Control>)
                }

                <Form.Control.Feedback type='invalid'> {state.volumeError} </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm='5'>
                {user.role === 'เกษตรกร' ? <Form.Label> ราคาสุทธิของยางที่ขาย (บาท) </Form.Label> : <Form.Label>ราคาสุทธิของยางที่ซื้อ (บาท)</Form.Label>}
                {state.priceError ?
                    (<Form.Control type='number' name='price' onChange={handleChange} isInvalid></Form.Control>) :
                    (<Form.Control type='number' name='price' onChange={handleChange}></Form.Control>)
                }
                <Form.Control.Feedback type='invalid'> {state.priceError} </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm='5'>
                {user.role === 'เกษตรกร' ? <Form.Label>ชื่อผู้ซื้อ (ชื่อ-นามสกุล)</Form.Label> : <Form.Label>ชื่อผู้ขาย (ชื่อ-นามสกุล)</Form.Label>}
                <InputGroup>
                    <Form.Control as='select' name='destination' onChange={handleChange}>
                        {
                            state.friendlist.map((friend, index) =>
                                <option key={index} value={friend} selected > {friend} </option>
                            )
                        }
                    </Form.Control>
                    <InputGroup.Append>
                        <AddFreind userId={props.userId} user={user}></AddFreind>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
                <br></br>
                <Button onClick={handleSubmit}>ยืนยัน</Button>
            </Form.Group>
        </div>
    )
}

export default Sale