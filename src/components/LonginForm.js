import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, NavItem } from 'reactstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { signIn } from '../actions';

// const isLogged = useSelector(state => state.isLogged)
// const dispatch = dispatch()

export default class LonginForm extends Component {
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
                    // dispatch(signIn())
                    window.location = '/'
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
                <NavItem> 
                    <NavLink onClick={this.toggle}>Sign In</NavLink>
                </NavItem> 
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        <div className="login-form container">
                            <div className="form-group">
                                <input onChange={this.handleChange} placeholder="username" name="username" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleChange} type="password" placeholder="password" name="password" className="form-control"/>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Login</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
    
}

