import React, { useState, memo } from 'react'
import {Modal, Button, Container, Form, Spinner, Alert } from 'react-bootstrap'
import axios from 'axios'

function EditPrice(props) {
    const [show, setShow] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const [price, setPrice] = useState(0)
    const [isValid, setIsValid] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        const format = new RegExp('^[0-9]+(.[0-9][0-9]?)?$')
        if(!format.test(price) || Number(price) === 0 ) setIsValid(true)
        else {
            setIsValid(false)
            setLoaded(true) 
            axios.post(`http://localhost:5000/price/update/${props.id}`, {
                price
            },{
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            }).then(res => {
                if(res.status === 200){
                    setLoaded(false)
                    props.setRefresh(true)
                    alert('แก้ไขข้อมูลสำเร็จ')
                    setShow(false)
                }
            }).catch(err => {
                alert(err)
            })
        }
    }

    const handleChange = (event) => {
        setPrice(event.target.value)
    }

    return (
        <>
            <Button onClick={handleShow}>แก้ไข</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Alert variant="danger" hidden={!isValid} style={{ textAlign: "center" }}> รูปแบบข้อมูลไม่ถูกต้อง กรุณาตรวจสอบใหม่ </Alert>
                <Modal.Body>
                    <Container>
                        <Form.Group>
                                <Form.Control placeholder={props.price} name="price" onChange={handleChange} />
                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={loaded ? true : false} >
                        ยกเลิก
                    </Button>
                    {
                        !loaded ? 
                        <Button variant="primary" onClick={handleSubmit}> ยืนยัน </Button> : 
                        <Button variant="primary" disabled>
                            ยืนยัน...
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

export default memo(EditPrice)
