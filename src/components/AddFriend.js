import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getFriend } from '../actions'
import axios from 'axios'

function AddFriend(props) {
    const [show, setModal] = useState(false)
    const [user, setUser] = useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    function toggle() {
        setModal(!show)
        setError('')
    }

    function handleChange(event) {
        setUser(event.target.value)
    }

    function handleSubmit() {
        axios.post('https://rubber-backend.herokuapp.com/users/addFriend/' + props.userId ,
        {
            username: user  
        }, {
            headers: {
                "Authorization": "Bearer " + props.user.token
            }
        }
        ).then(res => {
            if(res.data.message === 'Friend Added'){
                dispatch(getFriend(props.user.friendlist))
                var paramShareToAgriculturist = new URLSearchParams();
                paramShareToAgriculturist.append('accountNameShared', props.user.firstname + props.user.lastname)
                paramShareToAgriculturist.append('shareTo', "O=Agriculturist,L=Bangkok,C=TH")
                
                var paramShareToMiddleman = new URLSearchParams();
                paramShareToMiddleman.append('accountNameShared', props.user.firstname + props.user.lastname)
                paramShareToMiddleman.append('shareTo', "O=Middleman,L=Bangkok,C=TH")
        
                var paramShareBackToAgriculturist = new URLSearchParams();
                paramShareBackToAgriculturist.append('accountNameShared',  res.data.friends[res.data.friends.length-1])
                paramShareBackToAgriculturist.append('shareTo', "O=Agriculturist,L=Bangkok,C=TH")
                
                var paramShareBackToMiddleman = new URLSearchParams();
                paramShareBackToMiddleman.append('accountNameShared',  res.data.friends[res.data.friends.length-1])
                paramShareBackToMiddleman.append('shareTo', "O=Middleman,L=Bangkok,C=TH")
        
                const config = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
                console.log(user.role)
                console.log(res.data.status)
                console.log(res.status)
                if(user.role === 'พ่อค้าคนกลาง') {  
                    if (res.data.role === 'เกษตรกร') {               
                        axios.post('http://13.76.35.161/api/middleman/blockchainTransaction/shareAccount', paramShareToAgriculturist, config) 
                        .then(res => {
                            if (res.data.status === 'OK') {
                                alert('บันทึกข้อมูลสำเร็จ')
                                axios.post('http://13.76.35.161/api/agriculturist/blockchainTransaction/shareAccount', paramShareBackToMiddleman, config) 
                                .then(res => {    
                                    if (res.status === 'OK') {
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
                    else if (res.data.role === 'พ่อค้าคนกลาง') {
                        axios.post('httl://13.76.35.161/api/middleman/blockchainTransaction/shareAccount', paramShareToMiddleman, config)
                        .then(res => {
                            if(res.data.status === 'OK') {
                                alert('บันทึกข้อมูลสำเร็จ')
                                axios.post('httl://13.76.35.161/api/middleman/blockchainTransaction/shareAccount', paramShareBackToMiddleman, config)
                                .then(res => {    
                                    if (res.status === 'OK') {
                                        alert('บันทึกข้อมูลสำเร็จ')
                                    }
                                })
                                .catch(err => {
                                    alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
                                }) 
                            }
                        })
                    }
                }
                else if(user.role === 'เกษตรกร') {
                    if(res.data.role === 'เกษตรกร') {
                        axios.post('http://13.76.35.161/api/agriculturist/blockchainTransaction/shareAccount', paramShareToAgriculturist, config) 
                        .then(res => {
                            if (res.status === 'OK') {
                                alert('บันทึกข้อมูลสำเร็จ')
                                axios.post('http://13.76.35.161/api/agriculturist/blockchainTransaction/shareAccount', paramShareBackToAgriculturist, config) 
                                .then(res => {    
                                    if (res.status === 'OK') {
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
                    else if (res.data.role === 'พ่อค้าคนกลาง') {
                        axios.post('httl://13.76.35.161/api/agriculturist/blockchainTransaction/shareAccount', paramShareToMiddleman, config)
                        .then(res => {
                            if(res.status === 'OK') {
                                alert('บันทึกข้อมูลสำเร็จ')
                                axios.post('httl://13.76.35.161/api/middleman/blockchainTransaction/shareAccount', paramShareBackToAgriculturist, config)
                                .then(res => {    
                                    if (res.status === 'OK') {
                                        alert('บันทึกข้อมูลสำเร็จ')
                                    }
                                })
                                .catch(err => {
                                    alert('มีข้อผิดพลาดเกิดขึ้น กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง')
                                }) 
                            }
                        })
                    }
                }
                alert('เพิ่มเพื่อนสำเร็จ')
                toggle()
            } else {
                alert('ไม่สามารถเพิ่มเพื่อนซ้ำได้')
            }
        }).catch(() => {
            setError('ไม่พบบัญชีผู้ใช้')
        })   
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={toggle}>เพิ่มรายชื่อ</Button>
            <Modal show={show} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มรายชื่อ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>ชื่อบัญชีผู้ใช้</Form.Label>
                    { error ? 
                        (<Form.Control name='user' onChange={handleChange} isInvalid></Form.Control>) :
                        (<Form.Control name='user' onChange={handleChange}></Form.Control>)
                    }
                    <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        ยกเลิก
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        เพิ่มรายชื่อ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddFriend
