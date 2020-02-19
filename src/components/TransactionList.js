import React from 'react'
import { Accordion, Card, Col, Image, Row } from 'react-bootstrap'
import block from '../assets/block.png'
import Block from './Block'

function TransactionList(props) {
    return (
        <Accordion defaultActiveKey="0" hidden={props.hidden}>
            {
                props.transactions.map((chain, index) => {
                    return (
                        <Card key={index}>
                            <Accordion.Toggle as={Card.Header} eventKey={index}>
                                รายการที {index+1}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index}>
                                <Card.Body> 
                                    <Row>
                                    {
                                        chain.map((obj, index) => {
                                            const date = new Date(obj.createdAt)
                                            return  <Block obj={obj} date={date} isHidden={false} key={index}></Block>
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
                                                <div style={{fontSize: "15px", fontWeight: "bold"}}> {chain[chain.length-1].destination.name} </div> 
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
    )
}

export default TransactionList
