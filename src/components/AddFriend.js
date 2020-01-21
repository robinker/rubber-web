import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'

export class AddFriend extends Component {
    state = {
        show: false,
        user: '',
        error: '',
    }
    
    toggle = () => {
        this.setState({
            show: !this.state.show,
            user: '',
            error: '',
        })    
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        axios.post('https://rubber-backend.herokuapp.com/users/addFriend/' + this.props.userId ,
            {
                username: this.state.user
            },
            { withCredentials: true }
        ).then(res => {
            if(res.data.message === 'Friend Added'){
                alert('เพิ่มเพื่อนสำเร็จ')
                this.toggle()
            } else {
                alert('ไม่สามารถเพิ่มเพื่อนซ้ำได้')
            }
        }).catch(() => {
            this.setState({
                error: 'ไม่พบบัญชีผู้ใช้'
            })
        })
    }

    render() {
        return (
            <>
                <Button variant="outline-secondary" onClick={this.toggle}>เพิ่มเพื่อน</Button>
                <Modal show={this.state.show} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>เพิ่มเพื่อน</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>ชื่อบัญชีผู้ใช้</Form.Label>
                        { this.state.error ? 
                            (<Form.Control name='user' onChange={this.handleChange} isInvalid></Form.Control>) :
                            (<Form.Control name='user' onChange={this.handleChange}></Form.Control>)
                        }
                        <Form.Control.Feedback type='invalid'>{this.state.error}</Form.Control.Feedback>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggle}>
                            ยกเลิก
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            เพิ่มเพื่อน
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default AddFriend
