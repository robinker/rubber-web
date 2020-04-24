import React, {useState} from 'react'
import { InputGroup, Form, Button, Container, Alert } from 'react-bootstrap'
import axios from 'axios'

function Search() {
    const [input, setInput] = useState('')
    const [feedback, setFeedback] = useState('')

    function handleChange(e){
        setInput(e.target.value)
    }

    function handleSubmit () {
        const payload = input.trim()
        axios.post('https://rubber-backend.herokuapp.com/users/search',{
            cert: payload
        })
        .then(res => {
            if(res.data === 'OK') {
                setFeedback('ใบอนุญาตถูกต้อง')
            } else {
                setFeedback('ไม่พบใบอนุญาต')
            }
        })
    }

    return (
        <Container>
                <InputGroup>
                    <Form.Control  placeholder="ใส่เลขใบอนุญาต" onChange={handleChange} />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={handleSubmit}>ค้นหา</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Alert variant={feedback === 'ใบอนุญาตถูกต้อง' ? "success" : "danger"} hidden={feedback === '' ? true : false} style={{textAlign: "center"}}>{feedback}</Alert>
        </Container>
    )
}

export default Search