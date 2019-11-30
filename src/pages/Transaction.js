import React, { Component } from 'react'
import {Accordion, Card, Col, Row} from 'react-bootstrap'
import axios from 'axios'

class Transaction extends Component {
    state = {
        transactions: [],
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/sale/transactions/' + this.props.firstname + '/' +  this.props.lastname)
            .then(res => {
                let data = []
                res.data.map(obj => {
                    return data.push(obj.chain)
                })
                this.setState({transactions: data})
            })
            .catch(err => {
                console.log('Error: ', err)
            })
    }

    render() {
        return (
            <div className='container'>
                <h1>รายงานสุปการซื้อขาย</h1>
                
                <Accordion defaultActiveKey="0">
                    {
                        this.state.transactions.map((chain, index) => {
                            return (
                                <Card key={index}>
                                    <Accordion.Toggle as={Card.Header} eventKey={index}>
                                        รายการที {index+1}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index}>
                                        <Card.Body> 
                                            <Row>

                                            {
                                                chain.map((obj, i) => {
                                                    const date = new Date(obj.createdAt)
                                                    return  <Col key={i}>
                                                                <div> {obj.source} </div> 
                                                                <div> 
                                                                    <p> 
                                                                        ประเภทยาง:  {obj.rubberType} <br/>
                                                                        ปริมาณยาง:  {obj.volume} <br/>
                                                                        ราคา:  {obj.price} <br/>
                                                                        { date.getUTCDate() + "/" + date.getMonth() + "/" + (date.getUTCFullYear()+543) } <br/>
                                                                        { date.getHours() + ":" + date.getMinutes() + " น."}
                                                                    </p>
                                                                </div> 
                                                            </Col>    
                                                })
                                            }

                                            {
                                                <Col>
                                                    <div> {chain[chain.length-1].destination} </div> 
                                                    <div> 
                                                        <p> 
                                                            present holder
                                                        </p>
                                                    </div> 
                                                </Col>    
                                            }
                                                
                                            </Row>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            )
                        })
                        
                    }
                </Accordion>
            </div>
        )
    }
}


export default (Transaction);