import React, { Component } from 'react'
import {Accordion, Card, Col, Row, Image} from 'react-bootstrap'
import axios from 'axios'
import block from '../assets/block.png'
import chainOfBlock from '../assets/chain.png'

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
                <h2>รายงานสุปการซื้อขาย</h2>
                <br></br>
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
                                                                <Image
                                                                    src = {block}
                                                                    style={{marginLeft: "5%"}}
                                                                    width="50"
                                                                    height="50"
                                                                    
                                                                /> 
                                                                <Image
                                                                    src = {chainOfBlock}
                                                                    style={{marginLeft: "40%"}}
                                                                    width="40"
                                                                    height="15"
                                                                />
                                                                <div style={{fontSize: "12px"}}>
                                                                    <br></br>
                                                                    <div style={{fontSize: "15px", fontWeight: "bold"}}> {obj.source} </div> 
                                                                    <label> 
                                                                        ประเภทยาง:  {obj.rubberType} <br/>
                                                                        ปริมาณยาง:  {obj.volume} <br/>
                                                                        ราคา:  {obj.price} <br/>
                                                                        { date.getUTCDate() + "/" + date.getMonth() + "/" + (date.getUTCFullYear()+543) } <br/>
                                                                        { date.getHours() + ":" + date.getMinutes() + " น."}
                                                                    </label>
                                                                </div> 
                                                            </Col>    
                                                })
                                            }

                                            {
                                                <Col>
                                                    <Image
                                                        src = {block}
                                                        style={{marginLeft: "5%"}}
                                                        width="50"  
                                                        height="50"                     
                                                    /> 
                                                    <div style={{fontSize: "12px"}}>
                                                        <br></br>
                                                        <div style={{fontSize: "15px", fontWeight: "bold"}}> {chain[chain.length-1].destination} </div> 
                                                        <label> 
                                                            present holder
                                                        </label>
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