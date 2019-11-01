import React, { Component } from 'react';
import { Nav, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

class LonginForm extends Component {
    state = {
        modal: false,
        username: "",
        password: "",
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        })
    }
    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        const { username, password } = this.state
        axios.post('http://localhost:5000/users/login',
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
                }
            })
            .catch(err => {
                console.log('Error: ', err)
            })
        event.preventDefault()
    }

    render() {
        return (
            <>
                <Nav.Link onClick={this.toggle}>Sign In</Nav.Link>
                <Modal show={this.state.modal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
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