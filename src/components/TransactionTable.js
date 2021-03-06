import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import Pagination from './Pagination'
import { currentData, getIndex, dataPerPage } from '../pageconfigure'

function TransactionTable(props) {
    let sum = 0
    let totalPrice = 0
    let equal = false

    const [currentPage, setCurrentPage] = useState(1)
    const transactions = currentData(props.transactions, currentPage)
    const idx = getIndex(currentPage)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (<div hidden={props.hidden}>
        <Table responsive striped bordered >
            <thead>
                <tr>
                    <th rowSpan='2'>#</th>  
                    <th rowSpan='2'>วัน/เดือน/ปี</th>  
                    { 
                        props.header === 'รายการซื้อยาง' ?  <th rowSpan='2' style={{textAlign: "center"}}>ชื่อผู้จำหน่าย</th> : 
                        <th rowSpan='2' style={{textAlign: "center"}}>ชื่อผู้ซื้อ</th>
                    }
                    <th rowSpan='2'>ใบอนุญาตค้ายางที่</th>
                    <th colSpan='3' style={{textAlign: "center"}}>{props.header}</th>
                    { 
                        props.header === 'รายการซื้อยาง' ?  <th colSpan='4' style={{textAlign: "center"}}>รวมราคาประจำวันที่ซื้อ</th> : 
                        <th colSpan='4' style={{textAlign: "center"}}>รวมราคาประจำวันที่ขาย</th>
                    }
                </tr>
                <tr>
                    <th>ชนิดของยาง</th>
                    <th>จำนวนยาง กิโลกรัม</th>
                    <th>ราคากิโลกรัมละ</th>
                    <th>รวมจำนวนยาง</th>
                    <th>รวมเงิน</th>
                </tr>
            </thead>
            <tbody>
                {
                    transactions.map((transaction, index) => {
                        if(!equal){
                            sum = transaction.volume
                            totalPrice = transaction.price
                        }
                        equal = false
                        const date = new Date(transaction.createdAt)
                        if(index < transactions.length-1) {
                            let date2 = new Date(transactions[index+1].createdAt)
                            if(date.getUTCDate() === date2.getUTCDate() && date.getUTCMonth() === date2.getUTCMonth() && date.getUTCFullYear() === date2.getUTCFullYear()){
                                equal = true
                                sum += transactions[index+1].volume
                                totalPrice += transactions[index+1].price
                            }
                        }
                        return <tr key={index}>
                            <td> {idx[index] + 1} </td>
                            <td> {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getFullYear() + 543} </td>
                            {
                                props.header === 'รายการซื้อยาง' ?  
                                <td> {transaction.source.name} </td> : <td> {transaction.destination.name} </td>
                            }
                            {
                                props.header === 'รายการซื้อยาง' ?  
                                <td> {transaction.source.certification} </td> : <td> {transaction.destination.certification} </td>
                            }
                            <td> {transaction.rubberType} </td>
                            <td> {transaction.volume} </td>
                            <td> {(transaction.price / transaction.volume).toFixed(2) } </td>
                            <td> { equal ? '' : sum} </td>
                            <td> {equal ? '' : totalPrice} </td>
                        </tr>
                    })
                }
            </tbody>

        </Table>
        <Pagination dataPerPage={dataPerPage} totalData={props.transactions.length} paginate={paginate}/>
        </div>
    )
}

export default TransactionTable
