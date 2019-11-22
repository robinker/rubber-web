import React, { Component } from 'react'
import {Accordion, Card} from 'react-bootstrap'
export default class Transaction extends Component {
    render() {
        return (
            <div className='container'>
                <h1>รายงานสุปการขาย</h1>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            รายการที 1
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>รายการที 1</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            รายการที่ 2
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>รายการที 2</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}
