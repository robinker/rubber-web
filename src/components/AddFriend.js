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