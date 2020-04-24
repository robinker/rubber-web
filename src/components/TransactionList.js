import React from 'react'
import { Card, Col, Image, Row, Table } from 'react-bootstrap'
import block from '../assets/block.png'
import Block from './Block'

function TransactionList(props) {
    return (
        <Table hover hidden={props.hidden} style={{marginTop: "2em"}}>
            <thead>
                <tr>
                    <th>รายการที่</th>
                    <th style={{textAlign: "center"}}>Blockchain</th>
                </tr>
            </thead>
            <tbody>
            {
                props.transactions.map((chain, index) => {
                    let ratio = 100
                    if(chain.length > 4) ratio = chain.length*30
                    return (
                    <tr key={index}>
                    <td>{ index+1 }</td>
                    <td>
                        <Card style={{overflowX: "scroll"}}>
                            <Card.Body style={{width: `${ratio}%`}}> 
                                <Row>
                                {
                                    chain.map((obj, index) => {
                                        const date = new Date(obj.createdAt)
                                        return  <Block obj={obj} date={date} isHidden={false} key={index}></Block>
                                    })
                                }
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
                                                ผู้ถือครองปัจจุบัน
                                            </label>
                                        </div> 
                                    </Col>    
                                </Row>
                            </Card.Body>
                        </Card>
                    </td>
                    </tr>
                    )
                })
            }
            </tbody>
        </Table>
    )
}

export default TransactionList
