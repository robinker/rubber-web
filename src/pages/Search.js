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
                setFeedback('พบใบอณุญาติ')
            } else {
                setFeedback('ไม่พบใบอณุญาติ')
            }
        })
    }

    return (
        <Container>
                <InputGroup>
                    <Form.Control onChange={handleChange} />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={handleSubmit}>ค้นหา</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Alert variant={feedback === 'พบใบอณุญาติ' ? "success" : "danger"} hidden={feedback === '' ? true : false} >{feedback}</Alert>
        </Container>
    )
}

export default Search
