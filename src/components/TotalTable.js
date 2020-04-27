import React, {useState} from 'react'
import { Table } from 'react-bootstrap'
import Pagination from './Pagination'
import { currentData, getIndex, dataPerPage } from '../pageconfigure'

function TotalTable(props) {
    let sum = 0
    let equal = false
    const [currentPage, setCurrentPage] = useState(1)
    const transactions = currentData(props.transactions, currentPage)
    const idx = getIndex(currentPage)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (<>
        <Table responsive striped bordered>
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
                    transactions.map((transaction, index) => {
                        if(!equal){
                            sum = transaction.volume
                        }
                        equal = false
                        const date = new Date(transaction.createdAt)
                        if(index < transactions.length-1) {
                            let date2 = new Date(transactions[index+1].createdAt)
                            if(date.getUTCDate() === date2.getUTCDate() && date.getUTCMonth() === date2.getUTCMonth() && date.getUTCFullYear() === date2.getUTCFullYear()){
                                equal = true
                                sum += transactions[index+1].volume
                            }
                        }
                        return <tr key={index}>
                            <td> {idx[index] + 1} </td>
                            <td> {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getFullYear() + 543} </td>
                            <td> {transaction.volume} </td>
                            <td colSpan='3'> - </td>
                            <td> { equal ? '' : sum} </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        <Pagination dataPerPage={dataPerPage} totalData={props.transactions.length} paginate={paginate}/>
    </>

    )
}

export default TotalTable
