import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Nav, Modal, Button, Alert } from 'react-bootstrap'
import { signIn, getFriend } from '../actions'

function LoginForm() {
    const [state, setState] = useState({
        modal: false,
        username: "",
        password: "",
    })
    const [isValid, setValid] = useState(false)

    const dispatch = useDispatch()

    function toggle() {
        setState({
            ...state,
            modal: !state.modal
        })
    }

    function handleChange(event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        const { username, password } = state
        axios.post('https://rubber-backend.herokuapp.com/users/login',
            {
                username: username,
                password: password
            },
            { withCredentials: true }
        ).then(res => {
            dispatch(signIn(res.data.user))
            dispatch(getFriend(res.data.user.friendlist))
            if (res.data.message === 'Logged In') {
                toggle()
            } else {
                setValid(true)
            }
        })
        event.preventDefault()
    }

    return (
        <>
            <Nav.Link onClick={toggle}>Sign In</Nav.Link>
            <Modal show={state.modal} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>เข้าสู่ระบบ</Modal.Title>
                </Modal.Header>
                <Alert variant="danger" hidden={!isValid} style={{ textAlign: "center" }}> กรุณาตรวจสอบบัญชีผู้ใช้ และรหัสผ่านใหม่อีกครั้ง </Alert>
                <Modal.Body>
                    <div className="login-form container">
                        <div className="form-group">
                            <input onChange={handleChange} placeholder="username" name="username" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={handleChange} type="password" placeholder="password" name="password" className="form-control" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoginForm