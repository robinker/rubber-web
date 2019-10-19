import React, { Component } from 'react'
import { Container, Row, Col} from 'reactstrap'

export default class HeaderPage extends Component {
    render() {
        return (
            
            <Container fluid>
                <Row>
                    <Col md="6"> <h3> Rubber Info </h3></Col>

                    <Col md="6"><h3>User Name </h3></Col>
                </Row>
            </Container>
        )
    }
}
