import React from 'react'
import { Table } from 'react-bootstrap'

function TotalTable(props) {
    let sum = 0
    let equal = false
    return (
        <Table responsive striped bordered hidden={props.hidden}>
            <thead>
                <tr>
                    <th colSpan='7' style={{textAlign: "center"}}> บัญชีปริมาณยางคงเหลือ</th>
                </tr>
                <tr>
                    <th rowSpan='2'>#</th>  
                    <th rowSpan='2' style={{textAlign: "center"}}>วัน/เดือน/ปี</th>  
                    <th rowSpan='2' style={{textAlign: "center"}}>(2) <br></br>จำนวนยางของผู้ค้ายาง <br></br> กิโลกรัม</th>
                    <th colSpan='3' rowSpan='2'style={{textAlign: "center"}}>(3) <br></br> จำนวนยางของผู้อื่นที่อยู่ในครอบครองของผู้ค้า <br></br> กิโลกรัม</th>
                    <th colSpan='4' style={{textAlign: "center"}}>(4) <br></br>รวมจำนวนยางในช่อง (2) และ (3) <br></br> กิโลกรัม</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.transactions.map((transaction, index) => {
                        if(!equal){
                            sum = transaction.volume
                        }
                        equal = false
                        const date = new Date(transaction.createdAt)
                        if(index < props.transactions.length-1) {
                            let date2 = new Date(props.transactions[index+1].createdAt)
                            if(date.getUTCDate() === date2.getUTCDate() && date.getUTCMonth() === date2.getUTCMonth() && date.getUTCFullYear() === date2.getUTCFullYear()){
                                equal = true
                                sum += props.transactions[index+1].volume
                            }
                        }
                        return <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getFullYear() + 543} </td>
                            <td> 0 </td>
                            <td colSpan='3'> {transaction.volume} </td>
                            <td> { equal ? '' : sum} </td>
                        </tr>
                    })
                }
            </tbody>

        </Table>
    )
}

export default TotalTable
