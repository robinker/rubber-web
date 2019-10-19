import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Row, Col } from 'reactstrap';
export default class News extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm='6'>
                        <Card>
                            <CardImg top src="http://lorempixel.com/400/200/business" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{this.props.title1}</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <CardLink href="#">Link</CardLink>
                            </CardBody>
                        </Card>
                    </Col>
                    
                    <Col sm='6'>
                        <Card>
                            <CardImg top src="http://lorempixel.com/400/200/business" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{this.props.title2}</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <CardLink href="#">Link</CardLink>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
