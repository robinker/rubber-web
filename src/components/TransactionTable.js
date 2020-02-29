import React from 'react'
import { Table } from 'react-bootstrap'

function TransactionTable(props) {
    let sum = 0
    let totalPrice = 0
    let equal = false
    return (
        <Table responsive striped bordered hidden={props.hidden}>
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
                    <th colSpan='4' style={{textAlign: "center"}}>รวมราคาประจำวันที่ซื้อ</th>
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
                    props.transactions.map((transaction, index) => {
                        if(!equal){
                            sum = transaction.volume
                            totalPrice = transaction.price
                        }
                        equal = false
                        const date = new Date(transaction.createdAt)
                        if(index < props.transactions.length-1) {
                            let date2 = new Date(props.transactions[index+1].createdAt)
                            if(date.getUTCDate() === date2.getUTCDate() && date.getUTCMonth() === date2.getUTCMonth() && date.getUTCFullYear() === date2.getUTCFullYear()){
                                equal = true
                                sum += props.transactions[index+1].volume
                                totalPrice += props.transactions[index+1].price
                            }
                        }
                        return <tr key={index}>
                            <td> {index + 1} </td>
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
    )
}

export default TransactionTable
