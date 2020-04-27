import React, {useState} from 'react'
import { Card, Col, Image, Row, Table } from 'react-bootstrap'
import block from '../assets/block.png'
import Block from './Block'
import Pagination from './Pagination'
import { currentData, getIndex, dataPerPage } from '../pageconfigure'

function TransactionList(props) {

    const [currentPage, setCurrentPage] = useState(1)
    const transactions = currentData(props.transactions, currentPage)
    const idx = getIndex(currentPage)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return ( <div hidden={props.hidden}>
        <Table hover responsive  style={{marginTop: "2em"}}>
            <thead>
                <tr>
                    <th>รายการที่</th>
                    <th style={{textAlign: "center"}}>Blockchain</th>
                </tr>
            </thead>
            <tbody>
            {
                transactions.map((chain, index) => {
                    let ratio = 100
                    if(chain.length > 4) ratio = chain.length*30
                    return (
                    <tr key={index}>
                    <td>{ idx[index]+1 }</td>
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
        <Pagination dataPerPage={dataPerPage} totalData={props.transactions.length} paginate={paginate}/>
        </div>
    )
}

export default TransactionList
