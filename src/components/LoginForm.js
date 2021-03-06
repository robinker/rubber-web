import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Nav, Modal, Button, Alert, Spinner, InputGroup, Form, Container } from 'react-bootstrap'
import { signIn, getFriend } from '../actions'

function LoginForm() {
    const [state, setState] = useState({
        modal: false,
        username: "",
        password: "",
    })
    const [isValid, setValid] = useState(false)
    const [loaded, setLoaded] = useState(false)

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
        setLoaded(true)
        const { username, password } = state
        axios.post('https://rubber-backend.herokuapp.com/users/login',
            {
                username: username,
                password: password
            },
            { withCredentials: true }
        ).then(res => {
            if (res.data.message === 'Logged In') {
                dispatch(signIn(res.data.user))
                dispatch(getFriend(res.data.user.friendlist))
                setLoaded(false)
                toggle()
            } else {
                setValid(true)
                setLoaded(false)
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
                    <Container>
                        <Form.Group>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><ion-icon name="person-outline"></ion-icon></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control placeholder="username" name="username" onChange={handleChange} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><ion-icon name="lock-closed-outline"></ion-icon></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="password" placeholder="password" name="password" onChange={handleChange} />
                            </InputGroup>
                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle} disabled={loaded ? true : false} >
                        ยกเลิก
                    </Button>
                    {
                        !loaded ? 
                        <Button variant="primary" onClick={handleSubmit}> เข้าสู่ระบบ </Button> : 
                        <Button variant="primary" disabled>
                            เข้าสู่ระบบ...
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoginForm