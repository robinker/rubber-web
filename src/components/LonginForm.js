import React, { Component } from 'react';
import { Nav, Modal, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

class LonginForm extends Component {
    state = {
        modal: false,
        username: "",
        password: "",
        isValid: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            username: "",
            password: "",
            isValid: false
        })
    }
    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        const { username, password } = this.state
        axios.post('https://rubber-backend.herokuapp.com/users/login',
            {
                username: username,
                password: password
            },
            { withCredentials: true }
        )
            .then(res => {
                if(res.data.message === 'Logged In'){
                    this.props.getData(res.data.user)
                    this.toggle()
                } else {
                    this.setState({ isValid: true })
                }
            })
            .catch(err => {
                this.setState({ isValid: true })
            })
        event.preventDefault()
    }

    render() {
        return (
            <>
                <Nav.Link onClick={this.toggle}>Sign In</Nav.Link>
                <Modal show={this.state.modal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>เข้าสู่ระบบ</Modal.Title>
                    </Modal.Header>
                    <Alert variant="danger" hidden={!this.state.isValid} style={{textAlign: "center"}}> กรุณาตรวจสอบบัญชีผู้ใช้ และรหัสผ่านใหม่อีกครั้ง </Alert>
                    <Modal.Body>
                        <div className="login-form container">
                            <div className="form-group">
                                <input onChange={this.handleChange} placeholder="username" name="username" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleChange} type="password" placeholder="password" name="password" className="form-control"/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    
}
const mapDispatchtoProps = (dispatch) => ({
    getData: (data) => {
        dispatch({
            type: 'getData', 
            payload: data
        })
    }
})

export default connect(null,mapDispatchtoProps)(LonginForm)